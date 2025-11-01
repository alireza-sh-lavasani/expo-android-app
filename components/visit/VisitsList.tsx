import { EIdType } from '@alireza-lavasani/afiyet-common';
import { Link, useFocusEffect } from 'expo-router';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import {
    Button,
    Card,
    Chip,
    DataTable,
    Paragraph,
    Surface,
    Title,
} from 'react-native-paper';
import { Examination } from '../../models/examination.model';
import { Patient } from '../../models/patient.model';
import { useExaminationService } from '../../services/examination.service';

interface Props {
  patient: Patient;
}

const VisitsList: React.FC<Props> = ({ patient }) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([20, 40, 60]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  // Patient ID
  const patientId = patient?.patientId
    ? patient.patientId
    : patient.tmpPatientId;

  // type of id
  const idType = patient?.patientId ? EIdType.PERMANENT : EIdType.TEMP;

  const { getPatientExaminations } = useExaminationService(patientId, idType);

  let examinations: Examination[] | undefined;

  // Get patient examinations
  examinations = getPatientExaminations();

  useFocusEffect(() => {
    // Get patient examinations
    examinations = getPatientExaminations();
  });

  const { t } = useTranslation();

  const from = page * itemsPerPage;
  const to = Math.min(
    (page + 1) * itemsPerPage,
    examinations?.length as number
  );

  // If there are no examinations, show a message
  if (!examinations || !examinations.length)
    return (
      <View style={styles.cardWrapper}>
        <Card style={styles.card}>
          <Paragraph style={styles.paragraph}>
            {t('visitsList.noVisitsMessage')}
          </Paragraph>

          <Link
            href={`/patients/${patientId}/visits/new?idType=${idType}`}
            asChild
          >
            <Button mode="contained" icon="plus-thick" compact>
              {t('visitsList.addVisitButton')}
            </Button>
          </Link>
        </Card>
      </View>
    );

  // Render the visits list
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.container}>
        <Title style={styles.title}>
          {t('visitsList.totalVisits')}
          {examinations.length}
        </Title>

        <Surface style={styles.surface}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ justifyContent: 'flex-start' }}>
                {t('visitsList.listColumns._')}
              </DataTable.Title>

              <DataTable.Title
                style={{ justifyContent: 'flex-end' }}
                sortDirection="descending"
              >
                {t('visitsList.listColumns.date')}
              </DataTable.Title>

              <DataTable.Title numeric>
                {t('visitsList.listColumns.location')}
              </DataTable.Title>

              <DataTable.Title style={{ justifyContent: 'flex-end' }}>
                {t('visitsList.listColumns.addTest.title')}
              </DataTable.Title>
            </DataTable.Header>

            {
              // @ts-ignore
              examinations.slice(from, to).map((examination: any) => (
                <DataTable.Row key={examination?.examinationId}>
                  <DataTable.Cell style={{ justifyContent: 'flex-start' }}>
                    <Link
                      href={`/patients/${patientId}/visits/${examination.examinationId}`}
                    >
                      <Chip mode="outlined" icon="eye">
                        {t('visitsList.listColumns.viewVisitInfo')}
                      </Chip>
                    </Link>
                  </DataTable.Cell>

                  <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                    {moment(examination.updatedAt).format('DD MMM YYYY')}
                  </DataTable.Cell>

                  <DataTable.Cell numeric>
                    {examination.localDistrict}
                  </DataTable.Cell>

                  <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                    <Link
                      href={`/patients/${patientId}/visits/${examination.examinationId}/test/new`}
                      asChild
                    >
                      <Button mode="contained" icon="test-tube" compact>
                        {t('visitsList.listColumns.addTest.button')}
                      </Button>
                    </Link>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            }

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(examinations.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${examinations.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>
        </Surface>

        <Link
          href={`/patients/${patientId}/visits/new?idType=${idType}`}
          asChild
          style={{ marginBottom: 30 }}
        >
          <Button mode="contained" icon="plus-thick" compact>
            {t('visitsList.addVisitButton')}
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default VisitsList;

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
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
  },
});
