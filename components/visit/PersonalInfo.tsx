import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import {
  Card,
  TextInput,
  Button,
  RadioButton,
  Text,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import moment from "moment";
import EducationSelect from "./EducationSelect";
import { usePatientService } from "../../services/patient.service";
import { ICreatePatientDto } from "../../dto/createPatient.dto";
import { EFormModes } from "./visit.enum";
import { useRouter } from "expo-router";

/**************************************
 ******** PersonalInformationForm ********
 *************************************/
const PersonalInformationForm = ({
  mode,
  patientData,
}: {
  mode: EFormModes;
  patientData?: any;
}) => {
  // Last Menstruation Date
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Check if the device is a tablet
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  // Translation
  const { t } = useTranslation();

  // Use Patient Service
  const { createPatient, updatePatient } = usePatientService();

  // Form functions
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm({
    defaultValues: mode === EFormModes.EDIT ? patientData : undefined,
  });

  const { replace } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false); // Submitting state

  // Form submit
  const onSubmit: SubmitHandler<ICreatePatientDto> = async (
    newFormData: ICreatePatientDto
  ) => {
    setIsSubmitting(true);

    switch (mode) {
      case EFormModes.CREATE:
        createPatient(newFormData); // Create the patient in the database
        break;

      case EFormModes.EDIT:
        if (isDirty) {
          updatePatient(patientData!.id, newFormData); // Update the patient in the database
        }

      default:
        break;
    }

    // Reset the form
    reset();
    setIsSubmitting(false);

    // Navigate to the home screen
    replace("/");
  };

  // Watch the form data
  const birthDate = watch("birthDate");

  // Styles
  const styles = StyleSheet.create({
    container: {
      flexDirection: isTablet ? "row" : "column",
      gap: isTablet ? 50 : 0,
    },
    imageContainer: {
      width: "100%",
      flex: 1,
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
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      flexDirection: "row",
      fontWeight: "bold",
    },
    surface: {
      padding: 8,
      borderRadius: 4,
      elevation: 4,
      backgroundColor: "#eae3ff",
      marginBottom: 10,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 100,
      marginBottom: 10,
    },
    errorText: {
      color: "darkred",
      marginBottom: 10,
    },
    requiredLabel: {
      color: "darkred",
      marginLeft: 5,
    },
  });

  // Render
  return (
    <ScrollView>
      <Card>
        <Card.Title title={t("personalInfo.formTitle")} />
        <Card.Content>
          <Image
            source={require("../../assets/sample-patient.png")}
            style={styles.image}
          />

          <Divider style={{ marginBottom: 10 }} />

          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={t("personalInfo.uniqueGovID")}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={Boolean(errors.uniqueGovID)}
                    style={styles.textInput}
                    mode="outlined"
                  />
                )}
                name="uniqueGovID"
                defaultValue=""
              />
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      label={
                        <>
                          {t("personalInfo.fullName")}
                          <Text style={styles.requiredLabel}>*</Text>
                        </>
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={Boolean(errors.fullName)}
                      style={styles.textInput}
                      mode="outlined"
                    />
                    {errors.fullName && (
                      <Text style={styles.errorText}>
                        {t("personalInfo.requiredField")}
                      </Text>
                    )}
                  </>
                )}
                name="fullName"
                defaultValue=""
              />

              <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
                {birthDate ? (
                  moment(birthDate).format("D MMM YYYY")
                ) : (
                  <>
                    {t("personalInfo.selectBirthDate")}
                    <Text style={styles.requiredLabel}>*</Text>
                  </>
                )}
              </Button>
              {errors.birthDate && (
                <Text style={styles.errorText}>
                  {t("personalInfo.requiredField")}
                </Text>
              )}
              {showDatePicker && (
                <DateTimePicker
                  value={patientData?.birthDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(_, selectedDate) => {
                    setShowDatePicker(false);
                    setValue("birthDate", selectedDate || new Date(), {
                      shouldDirty: true,
                    });
                  }}
                />
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={{
                  ...styles.radioButtonLabel,
                  color: errors.gender ? "darkred" : "black",
                }}
              >
                {t("personalInfo.gender")}
                <Text style={styles.requiredLabel}>*</Text>
              </Text>

              <Controller
                rules={{ required: true }}
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <>
                    <RadioButton.Group onValueChange={onChange} value={value}>
                      <RadioButton.Item
                        label={t("personalInfo.male")}
                        value="male"
                      />
                      <RadioButton.Item
                        label={t("personalInfo.female")}
                        value="female"
                      />
                    </RadioButton.Group>
                    {errors.gender && (
                      <Text style={styles.errorText}>
                        {t("personalInfo.requiredField")}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
          </View>

          <Divider style={{ marginTop: 20, marginBottom: 30 }} />

          <View style={{ ...styles.container, marginBottom: 20 }}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={t("personalInfo.emmergencyContact")}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={Boolean(errors.emmergencyContact)}
                    style={styles.textInput}
                    mode="outlined"
                    inputMode="numeric"
                  />
                )}
                name="emmergencyContact"
                defaultValue={""}
              />

              <EducationSelect setValue={setValue} />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={{
                  ...styles.radioButtonLabel,
                  color: errors.maritalStatus ? "darkred" : "black",
                }}
              >
                {t("personalInfo.maritalStatus")}
                <Text style={styles.requiredLabel}>*</Text>
              </Text>

              <Controller
                control={control}
                rules={{ required: true }}
                name="maritalStatus"
                render={({ field: { onChange, value } }) => (
                  <>
                    <RadioButton.Group onValueChange={onChange} value={value}>
                      <RadioButton.Item
                        label={t("personalInfo.single")}
                        value="single"
                      />
                      <RadioButton.Item
                        label={t("personalInfo.married")}
                        value="married"
                      />
                    </RadioButton.Group>
                    {errors.maritalStatus && (
                      <Text style={styles.errorText}>
                        {t("personalInfo.requiredField")}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
          </View>

          {/* Submit Form */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty || !birthDate}
          >
            {isSubmitting ? (
              <ActivityIndicator animating={true} color="white" />
            ) : (
              t("personalInfo.submit")
            )}
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default PersonalInformationForm;
