import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ExaminationForm from '../../../../components/visit/ExaminationForm';
import { EFormModes } from '../../../../components/visit/visit.enum';
import { EIdType } from '@alireza-lavasani/afiyet-common';

const NewVisit = () => {
  const { patientId, idType } = useLocalSearchParams<{
    patientId: string;
    idType: EIdType;
  }>();

  console.log({ idType });

  return (
    <>
      <ExaminationForm
        mode={EFormModes.CREATE}
        patientId={patientId as string}
        idType={idType as EIdType}
      />
    </>
  );
};

export default NewVisit;
