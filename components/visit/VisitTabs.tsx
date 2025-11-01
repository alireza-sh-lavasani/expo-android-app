import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { EVisitSteps } from './visit.enum';

const VisitTabs = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: EVisitSteps;
  setCurrentTab: (currentTab: EVisitSteps) => void;
}) => {
  const { t } = useTranslation();

  // The value of the tabs
  const [value, setValue] = React.useState<EVisitSteps>(currentTab);

  // Update the value when the currentTab changes
  React.useEffect(() => {
    setValue(currentTab);
  }, [currentTab]);

  return (
    <SegmentedButtons
      style={styles.tabsContainer}
      value={value}
      onValueChange={value => {
        // setValue(value as EVisitSteps);
        // setCurrentTab(value as EVisitSteps);
      }}
      buttons={[
        {
          value: EVisitSteps.PERSONAL_INFO,
          label: t('visit.tabs.personalInfo'),
        },
        {
          value: EVisitSteps.EXAMINATION,
          label: t('visit.tabs.examination'),
        },
        { value: EVisitSteps.TESTS, label: t('visit.tabs.tests') },
        {
          value: EVisitSteps.NEXT_ACTION,
          label: t('visit.tabs.nextAction'),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    marginBottom: 20,
  },
});

export default VisitTabs;
