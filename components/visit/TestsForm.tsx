import React, { useState } from 'react';
import { useWindowDimensions, StyleSheet, ScrollView } from 'react-native';
import { Card, FAB, Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormNavigation from './FormNavigation';
import { EVisitSteps } from './visit.enum';
import SingleTest from './SingleTest';

const TestsForm = ({
  setCurrentTab,
}: {
  setCurrentTab: (currentTab: EVisitSteps) => void;
}) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const [performedTests, setPerformedTests] = useState<number>(1);

  const styles = StyleSheet.create({
    textRow: {
      marginBottom: 20,
    },
    fab: {},
  });

  return (
    <ScrollView>
      <Card>
        <Card.Title title={t('testsForm.formTitle')} />
        <Card.Content>
          <Text style={styles.textRow}>{t('testsForm.description')}</Text>

          {Array.from({ length: performedTests }, (_, index) => (
            <SingleTest key={index} index={index} />
          ))}

          {/* FAB */}
          <FAB
            // style={styles.fab}
            icon="plus"
            label="Add Another Test"
            onPress={() => setPerformedTests(prevState => prevState + 1)}
          />

          {/* Form Navigation */}
          <FormNavigation
            handleNext={{
              action: () => {
                setCurrentTab(EVisitSteps.NEXT_ACTION);
              },
              label: t('visit.tabs.nextAction'),
              disabled: false,
            }}
            handlePrev={{
              action: () => {
                setCurrentTab(EVisitSteps.EXAMINATION);
              },
              label: t('visit.tabs.examination'),
              disabled: false,
            }}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default TestsForm;
