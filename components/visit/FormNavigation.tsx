import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

interface FormNavigationProps {
  handleNext: {
    action: () => void;
    disabled: boolean;
    label: string;
    isSubmitting?: boolean;
  };
  handlePrev: {
    action: () => void;
    disabled: boolean;
    label: string;
  };
}

const FormNavigation = ({ handleNext, handlePrev }: FormNavigationProps) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 100,
      }}
    >
      <Button
        mode="outlined"
        onPress={handlePrev.action}
        style={{ flex: 1 }}
        disabled={handlePrev.disabled}
      >
        {handlePrev.disabled
          ? `${t('visit.formNavigation.prevStep')} ${handlePrev.label}`
          : `${t('visit.formNavigation.prevStep')} (${handlePrev.label})`}
      </Button>

      <Button
        mode="contained"
        onPress={handleNext.action}
        style={{ flex: 1 }}
        disabled={handleNext.disabled || handleNext.isSubmitting}
      >
        {handleNext.disabled
          ? `${t('visit.formNavigation.nextStep')} ${handleNext.label}`
          : handleNext.isSubmitting
            ? t('visit.formNavigation.isSubmitting')
            : `${t('visit.formNavigation.nextStep')} (${handleNext.label})`}
      </Button>
    </View>
  );
};

export default FormNavigation;
