import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, TextInput, Button, Text } from 'react-native-paper';
// import { Camera } from 'expo-camera';
// import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import PersonalInfo from './PersonalInfo';
import VisitTabs from './VisitTabs';
import { EVisitSteps } from './visit.enum';
import ExaminationForm from './ExaminationForm';
import TestsForm from './TestsForm';
import NextActionForm from './NextActionForm';
import { IPatientData } from '../../dto/createPatient.dto';
import { IRenderVisitStepProps } from './interfaces';
import { useTranslation } from 'react-i18next';

const Visit = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [photo, setPhoto] = useState<string | null>(null);

  const { t } = useTranslation();

  // Personal info form values
  const [personalInfoFormData, setPersonalInfoFormData] =
    useState<IPatientData>();

  const [examinationFormData, setExaminationFormData] = useState<any>();

  // Sets the active tab
  const [currentTab, setCurrentTab] = useState<EVisitSteps>(
    EVisitSteps.PERSONAL_INFO
  );

  // const takePhoto = async () => {
  //   const { status } = await Camera.requestCameraPermissionsAsync();
  //   if (status === 'granted') {
  //     const result: ImagePicker.ImagePickerResult =
  //       await ImagePicker.launchCameraAsync({
  //         allowsEditing: true,
  //         aspect: [1, 1],
  //         quality: 0.5,
  //       });

  //     if (!result.canceled && result.uri) {
  //       setPhoto(result.uri);
  //     }
  //   }
  // };

  // const pickPhoto = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status === 'granted') {
  //     const result: ImagePicker.ImagePickerResult =
  //       await ImagePicker.launchImageLibraryAsync({
  //         allowsEditing: true,
  //         aspect: [1, 1],
  //         quality: 0.5,
  //       });

  //     if (!result.canceled && result.uri) {
  //       setPhoto(result.uri);
  //     }
  //   }
  // };

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log('Form submitted', data);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Shows visit steps tabs */}
        <VisitTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Renders the current visit step */}
        <RenderVisitStep
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          personalInfoFormData={personalInfoFormData}
          setPersonalInfoFormData={setPersonalInfoFormData}
          examinationFormData={examinationFormData}
          setExaminationFormData={setExaminationFormData}
        />
      </View>
    </>
  );
};

/**
 * Renders the current visit step
 */
const RenderVisitStep = ({
  currentTab,
  setCurrentTab,
  personalInfoFormData,
  setPersonalInfoFormData,
  examinationFormData,
  setExaminationFormData,
}: IRenderVisitStepProps) => {
  switch (currentTab) {
    case EVisitSteps.EXAMINATION:
      return (
        <ExaminationForm
          setCurrentTab={setCurrentTab}
          patientId={personalInfoFormData!.id}
          examinationFormData={examinationFormData}
          setExaminationFormData={setExaminationFormData}
        />
      );

    case EVisitSteps.TESTS:
      return <TestsForm setCurrentTab={setCurrentTab} />;

    case EVisitSteps.NEXT_ACTION:
      return <NextActionForm setCurrentTab={setCurrentTab} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  photo: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
});

export default Visit;
