import React from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Divider, Surface, Text, Title } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import SymptomForm from './symptomsForm';
import { EFormModes } from './visit.enum';
import { Examination } from '../../models/examination.model'

const VisitSummary = ({
  examination,
}: {
  examination: Examination;
}) => {
  // Check if the device is a tablet
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const { t } = useTranslation();

  // Styles
  const styles = StyleSheet.create({
    pairsContainer: {
      flexDirection: isTablet ? 'row' : 'column',
      gap: isTablet ? 10 : 0,
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    keyValuePair: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '45%',
    },
    key: {
      marginRight: 10,
      fontSize: 13,
    },
    value: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    surface: {
      backgroundColor: '#fff',
      padding: 40,
      paddingTop: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 40,
      color: '#6750a4',
    },
    divider: {
      width: '100%',
      marginBottom: 20,
      backgroundColor: '#6750a4',
      height: 1,
    },
  });

  // Render the visit summary card
  return (
    <>
      <Surface style={styles.surface}>
        <Title style={styles.title}>
          {t('examinationForm.locationCard.title')}
        </Title>

        <Divider style={styles.divider} />

        <View style={styles.pairsContainer}>
          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.locationCard.zoba.label')}:
            </Text>
            <Text style={styles.value}>{examination.zoba || '-'}</Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.locationCard.subZoba.label')}:
            </Text>
            <Text style={styles.value}>{examination.subZoba || '-'}</Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.locationCard.localDistrict')}:
            </Text>
            <Text style={styles.value}>{examination.localDistrict || '-'}</Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.locationCard.longitude')}:
            </Text>
            <Text style={styles.value}>{examination.longitude || '-'}</Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.locationCard.latitude')}:
            </Text>
            <Text style={styles.value}>{examination.latitude || '-'}</Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.locationCard.address')}:
            </Text>
            <Text style={styles.value}>{examination.address || '-'}</Text>
          </View>
        </View>

        <Title style={styles.title}>
          {t('examinationForm.vitalsCard.title')}
        </Title>

        <Divider style={styles.divider} />

        <View style={styles.pairsContainer}>
          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.vitalsCard.temperature')}:
            </Text>
            <Text style={styles.value}>
              {examination.temperature + ' C' || '-'}
            </Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.vitalsCard.bloodPressureSystolic')}:
            </Text>
            <Text style={styles.value}>
              {examination.bloodPressureSystolic + ' mm/hg' || '-'}
            </Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.vitalsCard.bloodPressureDiastolic')}:
            </Text>
            <Text style={styles.value}>
              {examination.bloodPressureDiastolic + ' mm/hg' || '-'}
            </Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.vitalsCard.heartRate')}:
            </Text>
            <Text style={styles.value}>
              {examination.heartRate + ' bpm' || '-'}
            </Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.vitalsCard.respiratoryRate')}:
            </Text>
            <Text style={styles.value}>
              {examination.respiratoryRate + ' breath/min' || '-'}
            </Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.vitalsCard.oxygenSaturation')}:
            </Text>
            <Text style={styles.value}>
              {examination.oxygenSaturation + '%' || '-'}
            </Text>
          </View>

          <View style={styles.keyValuePair}>
            <Text style={styles.key}>
              {t('examinationForm.vitalsCard.bloodSugar')}:
            </Text>
            <Text style={styles.value}>
              {examination.bloodSugar + 'mg/dl' || '-'}
            </Text>
          </View>
        </View>

        <Title style={styles.title}>
          {t('examinationForm.currentCondition.title')}
        </Title>

        {/* <Divider style={styles.divider} /> */}

        <SymptomForm mode={EFormModes.EDIT} examination={examination} />
      </Surface>
    </>
  );
};

export default VisitSummary;
