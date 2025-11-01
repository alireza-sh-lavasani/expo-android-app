import React, { useState } from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Card,
  TextInput,
  Button,
  Text,
  Surface,
  Divider,
  Menu,
  ActivityIndicator,
} from 'react-native-paper';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { EFormModes } from './visit.enum';
import { ISubZoba, IZoba, zobas, subZobas } from './zobas';
import { IExaminationProps } from './visit.interface';
import { ICreateExaminationDto } from '../../dto/createExamination.dto';
import { useExaminationService } from '../../services/examination.service';
import { useRouter } from 'expo-router';
import SymptomForm from './symptomsForm';

const ExaminationForm = ({
  examinationFormData,
  patientId,
  mode,
  examinationId,
  idType,
}: IExaminationProps) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const { t } = useTranslation();

  // Zobas states
  const [zobaVisible, setZobaVisible] = useState(false);
  const [zoba, setZoba] = useState<IZoba | null>(null);

  const [subZobaVisible, setSubZobaVisible] = useState(false);
  const [subZoba, setSubZoba] = useState<ISubZoba | null>(null);

  // Examination service
  const { createExamination, updateExamination } = useExaminationService(
    patientId,
    idType
  );

  // Form state
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm({
    defaultValues: mode === EFormModes.EDIT ? examinationFormData : {},
  });

  const { replace } = useRouter(); // This is a custom hook that returns the router object

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit the form
  const onSubmit: SubmitHandler<ICreateExaminationDto> = (
    newFormData: ICreateExaminationDto
  ) => {
    setIsSubmitting(true);

    // Create mode
    if (mode === EFormModes.CREATE) {
      createExamination(newFormData); // Create the examination in the database
    }
    // Update mode
    else if (isDirty && mode === EFormModes.EDIT && examinationId) {
      updateExamination(examinationId, newFormData); // Update the examination in the database
    }

    replace(`/patients/${patientId}/visits`); // Redirect to the visits page
  };

  const styles = StyleSheet.create({
    cardContent: {
      paddingTop: 10,
      gap: 20,
    },
    container: {
      flexDirection: isTablet ? 'row' : 'column',
      gap: isTablet ? 10 : 0,
    },
    inputContainer: {
      flex: 1,
      margin: 5,
    },
    textInput: {
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
      marginBottom: 10,
    },
    radioButtonContainer: {
      marginTop: 10,
    },
    radioButtonLabel: {
      marginBottom: 5,
    },
    isPregnantContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
      fontWeight: 'bold',
    },
    surface: {
      padding: 8,
      borderRadius: 4,
      elevation: 4,
      marginBottom: 10,
    },
    zobaRow: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      // @ts-ignore
      title: {
        marginEnd: 10,
      },
    },
    textArea: {
      minHeight: 175,
    },
  });

  return (
    <ScrollView>
      <Card>
        <Card.Title title={t('examinationForm.formTitle')} />
        <Card.Content style={styles.cardContent}>
          {/* Location Information */}
          <Surface style={styles.surface}>
            <Text variant="headlineSmall" style={{ marginBottom: 3 }}>
              {t('examinationForm.locationCard.title')}
            </Text>
            <Text variant="bodySmall">
              {t('examinationForm.locationCard.description')}
            </Text>
            <Divider style={{ marginBottom: 20, marginTop: 10 }} />

            <View style={styles.container}>
              {/* Select Zoba */}
              <View style={styles.inputContainer}>
                <View style={styles.zobaRow}>
                  <Text variant="titleMedium" style={styles.zobaRow.title}>
                    {t('examinationForm.locationCard.zoba.label')}:
                  </Text>

                  <Menu
                    visible={zobaVisible}
                    onDismiss={() => setZobaVisible(false)}
                    anchor={
                      <Button
                        onPress={() => setZobaVisible(true)}
                        mode="elevated"
                      >
                        {zoba !== null
                          ? zoba.title
                          : t('examinationForm.locationCard.zoba.button')}
                      </Button>
                    }
                  >
                    {zobas.map((zoba, index) => (
                      <Menu.Item
                        key={index}
                        onPress={() => {
                          setZoba(zoba);
                          setValue('zoba', zoba.value, {
                            shouldDirty: true,
                          });
                          setZobaVisible(false);
                        }}
                        title={zoba.title}
                      />
                    ))}
                  </Menu>
                </View>
              </View>

              {/* Select Sub-Zoba */}
              <View style={styles.inputContainer}>
                <View style={styles.zobaRow}>
                  <Text variant="titleMedium" style={styles.zobaRow.title}>
                    {t('examinationForm.locationCard.subZoba.label')}:
                  </Text>

                  <Menu
                    visible={subZobaVisible}
                    onDismiss={() => setSubZobaVisible(false)}
                    anchor={
                      <Button
                        onPress={() => setSubZobaVisible(true)}
                        mode="elevated"
                        disabled={zoba === null}
                      >
                        {subZoba !== null
                          ? subZoba.title
                          : t('examinationForm.locationCard.subZoba.button')}
                      </Button>
                    }
                  >
                    {zoba !== null &&
                      subZobas[zoba.value].map((subZoba, index) => (
                        <Menu.Item
                          key={index}
                          onPress={() => {
                            setSubZoba(subZoba);
                            setValue('subZoba', subZoba.value, {
                              shouldDirty: true,
                            });
                            setSubZobaVisible(false);
                          }}
                          title={subZoba.title}
                        />
                      ))}
                  </Menu>
                </View>
              </View>
            </View>

            <Divider style={{ marginBottom: 20, marginTop: 10 }} />

            <View style={styles.container}>
              {/* Local District */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('examinationForm.locationCard.localDistrict')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.localDistrict)}
                      style={styles.textInput}
                      mode="outlined"
                    />
                  )}
                  name="localDistrict"
                  defaultValue=""
                />
              </View>

              <View style={styles.inputContainer}>
                {/* Longitude */}
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('examinationForm.locationCard.longitude')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.longitude)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="longitude"
                  defaultValue=""
                />
              </View>

              {/* Latitude */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={t('examinationForm.locationCard.latitude')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.latitude)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="latitude"
                  defaultValue=""
                />
              </View>
            </View>

            {/* Address */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={t('examinationForm.locationCard.address')}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={Boolean(errors.address)}
                    style={styles.textInput}
                    mode="outlined"
                  />
                )}
                name="address"
                defaultValue=""
              />
            </View>
          </Surface>

          {/* Patient Vital Signs */}
          <Surface style={styles.surface}>
            <Text variant="headlineSmall">
              {t('examinationForm.vitalsCard.title')}
            </Text>
            <Divider style={{ marginBottom: 20, marginTop: 10 }} />

            <View style={styles.container}>
              {/* Temperature */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={`${t(
                        'examinationForm.vitalsCard.temperature'
                      )} (°C)`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.temperature)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="temperature"
                  defaultValue=""
                />
              </View>

              {/* Blood Pressure Systolic (mmHg) */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={`${t(
                        'examinationForm.vitalsCard.bloodPressureSystolic'
                      )} (mmHg)`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.bloodPressureSystolic)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="bloodPressureSystolic"
                  defaultValue=""
                />
              </View>

              {/* Blood Pressure Diastolic (mmHg) */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={`${t(
                        'examinationForm.vitalsCard.bloodPressureDiastolic'
                      )} (mmHg)`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.bloodPressureDiastolic)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="bloodPressureDiastolic"
                  defaultValue=""
                />
              </View>

              {/* Heart Rate */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={`${t(
                        'examinationForm.vitalsCard.heartRate'
                      )} (beat/min)`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.heartRate)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="heartRate"
                  defaultValue=""
                />
              </View>
            </View>

            <View style={styles.container}>
              {/* Respiratory Rate */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={`${t(
                        'examinationForm.vitalsCard.respiratoryRate'
                      )} (breath/min)`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.respiratoryRate)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="respiratoryRate"
                  defaultValue=""
                />
              </View>

              {/* Oxygen Saturation */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={`${t(
                        'examinationForm.vitalsCard.oxygenSaturation'
                      )} (%)`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.oxygenSaturation)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="oxygenSaturation"
                  defaultValue=""
                />
              </View>

              {/* Blood Sugar (mg/dl) */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={`${t(
                        'examinationForm.vitalsCard.bloodSugar'
                      )} (mg/dl)`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.bloodSugar)}
                      style={styles.textInput}
                      mode="outlined"
                      keyboardType="numeric"
                    />
                  )}
                  name="bloodSugar"
                  defaultValue=""
                />
              </View>
            </View>
          </Surface>

          {/* Patient's Current Conditoin */}
          <Surface style={styles.surface}>
            <Text variant="headlineSmall">
              {t('examinationForm.currentCondition.title')}
            </Text>
            <Divider style={{ marginBottom: 20, marginTop: 10 }} />

            {/* Render Symptoms Form */}
            <SymptomForm
              control={control}
              mode={EFormModes.CREATE}
              setValue={setValue}
            />
          </Surface>

          {/* Submit Form */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? (
              <ActivityIndicator animating={true} color="white" />
            ) : (
              t('personalInfo.submit')
            )}
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default ExaminationForm;
