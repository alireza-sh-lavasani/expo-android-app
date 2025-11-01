import { EIdType, beautifyId } from '@alireza-lavasani/afiyet-common';
import { Link, useFocusEffect } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import {
    Button,
    Card,
    Chip,
    DataTable,
    Surface,
    Text,
} from 'react-native-paper';
import { usePatientService } from '../../services/patient.service';
import { ESyncEvents } from '../../services/sync.enum';
import { eventEmitter } from '../../utils/event-emmiter';

const PatientsList = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([20, 40, 60]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const { patients, getAllPatients } = usePatientService();
  const { t } = useTranslation();

  // Fetch patients on page focus
  useFocusEffect(() => {
    getAllPatients();
  });

  // Listen to sync events and refresh data
  useEffect(() => {
    const refreshData = () => {
      getAllPatients();
    };

    eventEmitter.on(ESyncEvents.SYNCED_LATEST_DATA, refreshData);

    return () => {
      eventEmitter.off(ESyncEvents.SYNCED_LATEST_DATA, refreshData);
    };
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, patients?.length);

  // Reset the page when the items per page changes
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  // If there are no patients, show a message
  if (!patients.length)
    return (
      <View style={styles.cardWrapper}>
        <Card style={styles.card}>
          <Text variant='bodyMedium' style={styles.paragraph}>
            {t('patientsList.noPatientsMessage')}
          </Text>

          <Link href="/patients/new" asChild>
            <Button mode="contained" icon="plus-thick" compact>
              {t('patientsList.addPatientButton')}
            </Button>
          </Link>
        </Card>
      </View>
    );

  // Render the patients list
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.container}>
        <Text variant='titleLarge' style={styles.title}>
          {t('patientsList.totalPatients')}
          {patients?.length}
        </Text>

        <Surface style={styles.surface}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                sortDirection="ascending"
                style={{ justifyContent: 'flex-start' }}
              >
                {t('patientsList.listColumns.fullName')}
              </DataTable.Title>

              <DataTable.Title style={{ justifyContent: 'flex-end' }}>
                {t('patientsList.listColumns.birthDate')}
              </DataTable.Title>

              <DataTable.Title numeric>
                {t('patientsList.listColumns.patientId')}
              </DataTable.Title>

              <DataTable.Title style={{ justifyContent: 'flex-end' }}>
                {t('patientsList.listColumns.addVisit.title')}
              </DataTable.Title>
            </DataTable.Header>

            {patients?.slice(from, to).map(patient => {
              const patientId = patient?.patientId
                ? patient.patientId
                : patient.tmpPatientId;

              // type of id
              const idType = patient?.patientId
                ? EIdType.PERMANENT
                : EIdType.TEMP;

              return (
                <DataTable.Row key={patientId}>
                  <DataTable.Cell style={{ justifyContent: 'flex-start' }}>
                    <Link href={`/patients/${patientId}/visits`}>
                      <Chip
                        mode={patient.gender === 'male' ? 'outlined' : 'flat'}
                        icon={
                          patient.gender === 'male' ? 'face-man' : 'face-woman'
                        }
                      >
                        {patient.fullName}
                      </Chip>
                    </Link>
                  </DataTable.Cell>

                  <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                    {moment(patient.birthDate).format('DD MMM YYYY')}
                  </DataTable.Cell>

                  <DataTable.Cell numeric>
                    {beautifyId(patientId)}
                  </DataTable.Cell>

                  <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                    {/* use useNavigate instead of manual addresses */}
                    <Link
                      href={`/patients/${patientId}/visits/new?idType=${idType}`}
                      asChild
                    >
                      <Button mode="contained" icon="eye-plus" compact>
                        {t('patientsList.listColumns.addVisit.button')}
                      </Button>
                    </Link>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(patients?.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${patients?.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>
        </Surface>

        <Link href="/patients/new" asChild style={{ marginBottom: 30 }}>
          <Button mode="contained" icon="plus-thick" compact>
            {t('patientsList.addPatientButton')}
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default PatientsList;

/**************************************
 ******** Stylesheet Stylings *********
 *************************************/
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '90%',
  },
  surface: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 40,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    width: '90%',
    textAlign: 'center',
    elevation: 2,
  },
  paragraph: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
  },
});
