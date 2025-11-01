import React, { useState } from 'react';
import { Platform, useWindowDimensions, StyleSheet } from 'react-native';
import { Card, Text, Surface } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormNavigation from './FormNavigation';
import { EVisitSteps } from './visit.enum';

const NextActionForm = ({
  setCurrentTab,
}: {
  setCurrentTab: (currentTab: EVisitSteps) => void;
}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const gender = watch('gender');

  const onChangeDate = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: isTablet ? 50 : 0,
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
      padding: 20,
      borderRadius: 4,
      elevation: 4,
      backgroundColor: '#eae3ff',
      marginBottom: 10,
      marginTop: 10,
    },
    li: {
      marginBottom: 5,
      fontWeight: 'bold',
    },
  });

  return (
    <Card>
      <Card.Title title={t('nextActionForm.formTitle')} />
      <Card.Content>
        <Text variant="titleMedium">
          Based on the data gathered in previous steps on the examination and
          tests step the built in Artificial Intelligence in the system will
          suggest the next course of action.
        </Text>
        <Text variant="titleMedium">
          The suggested next action can be something like:
        </Text>

        <Surface style={styles.surface}>
          <Text style={styles.li}>
            {'\u2022'} Send the patient home with the prescribed medicine
          </Text>

          <Text style={styles.li}>
            {'\u2022'} Refer the patient to a bigger health center or hospital
            for further examination and running more advanced tests
          </Text>

          <Text style={styles.li}>
            {'\u2022'} Request an ambulance from the nearest health center
          </Text>
        </Surface>

        {/* Form Navigation */}
        <FormNavigation
          handleNext={{
            action: () => {},
            label: '',
            disabled: true,
          }}
          handlePrev={{
            action: () => {
              setCurrentTab(EVisitSteps.TESTS);
            },
            label: t('visit.tabs.tests'),
            disabled: false,
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default NextActionForm;
