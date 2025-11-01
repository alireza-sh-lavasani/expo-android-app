import { ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import VisitSummary from '../../../../../components/visit/VisitSummary';
import { useExaminationService } from '../../../../../services/examination.service';
import { Examination } from '../../../../../models/examination.model';
import React from 'react';
import { EIdType } from '@alireza-lavasani/afiyet-common';

const VisitPage = () => {
  const { patientId, visitId, idType } = useLocalSearchParams<{
    patientId: string;
    visitId: string;
    idType: EIdType;
  }>();

  const { getExaminationById } = useExaminationService(
    patientId as string,
    idType as EIdType
  );

  const examination = getExaminationById(visitId as string);

  return (
    <>
      <ScrollView>
        <VisitSummary examination={examination as Examination} />
      </ScrollView>
    </>
  );
};

export default VisitPage;
