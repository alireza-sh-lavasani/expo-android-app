import { ScrollView } from 'react-native';
import PatientProfileCard from '../../../../components/patientProfile/patientProfileCard';
import { usePatientService } from '../../../../services/patient.service';
import { useLocalSearchParams } from 'expo-router';
import VisitsList from '../../../../components/visit/VisitsList';
import { Text } from 'react-native-paper';
import React from 'react';

const PatientVisits = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const { getPatientById } = usePatientService();

  const patientData = getPatientById(patientId as string);

  // If the patient exists, render the patient profile card and the visits list
  if (patientData) {
    return (
      <>
        <ScrollView>
          <PatientProfileCard patient={patientData} />

          <VisitsList patient={patientData} />
        </ScrollView>
      </>
    );
  }

  // 404
  return (
    <>
      <Text>404 - No patient found with id {patientId}</Text>
    </>
  );
};

export default PatientVisits;
