import { beautifyId } from '@alireza-lavasani/afiyet-common';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Patient } from '../../models/patient.model';

const PatientProfileCard = ({ patient }: { patient: Patient }) => {
  // Check if the device is a tablet
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const { t } = useTranslation();

  // Styles
  const styles = StyleSheet.create({
    dualCol: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    imageWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      flex: 1,
    },
    pairsContainer: {
      flex: 2,
      flexDirection: isTablet ? 'row' : 'column',
      gap: isTablet ? 25 : 0,
      padding: 40,
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    keyValuePair: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '45%',
    },
    key: {
      marginRight: 5,
      fontSize: 12,
    },
    value: {
      fontWeight: 'bold',
      fontSize: 13,
    },
    surface: {
      backgroundColor: '#fff',
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 100,
      marginBottom: 10,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  // Render the patient profile card
  return (
    <>
      <Surface style={styles.surface}>
        <View style={styles.dualCol}>
          {/* Profile Picture */}
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/sample-patient.png')}
              style={styles.image}
            />

            <Text style={styles.value}>{patient.fullName || '-'}</Text>
          </View>

          {/* Pairs */}
          <View style={styles.pairsContainer}>
            <View style={styles.keyValuePair}>
              <Text style={styles.key}>{t('personalInfo.patientId')}:</Text>
              <Text style={styles.value}>
                {(patient.patientId && beautifyId(patient.patientId)) || '-'}
              </Text>
            </View>

            <View style={styles.keyValuePair}>
              <Text style={styles.key}>{t('personalInfo.tmpPatientId')}:</Text>
              <Text style={styles.value}>
                {(patient.tmpPatientId && beautifyId(patient.tmpPatientId)) ||
                  '-'}
              </Text>
            </View>

            <View style={styles.keyValuePair}>
              <Text style={styles.key}>{t('personalInfo.uniqueGovID')}:</Text>
              <Text style={styles.value}>{patient.uniqueGovID || '-'}</Text>
            </View>

            <View style={styles.keyValuePair}>
              <Text style={styles.key}>
                {t('personalInfo.emmergencyContact')}:
              </Text>
              <Text style={styles.value}>
                {patient.emmergencyContact || '-'}
              </Text>
            </View>

            <View style={styles.keyValuePair}>
              <Text style={styles.key}>{t('personalInfo.gender')}:</Text>
              <Text style={styles.value}>{patient.gender || '-'}</Text>
            </View>

            <View style={styles.keyValuePair}>
              <Text style={styles.key}>{t('personalInfo.birthDate')}:</Text>
              <Text style={styles.value}>
                {moment(patient.birthDate).format('D MMM YYYY')}
              </Text>
            </View>

            <View style={styles.keyValuePair}>
              <Text style={styles.key}>{t('miniProfile.education')}:</Text>
              <Text style={styles.value}>{patient.education || '-'}</Text>
            </View>

            <View style={styles.keyValuePair}>
              <Text style={styles.key}>{t('personalInfo.maritalStatus')}:</Text>
              <Text style={styles.value}>{patient.maritalStatus || '-'}</Text>
            </View>
          </View>
        </View>
      </Surface>
    </>
  );
};

export default PatientProfileCard;
