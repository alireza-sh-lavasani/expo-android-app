import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Menu, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

type EducationSelectProps = {
  setValue: Function;
};

const EducationSelect: React.FC<EducationSelectProps> = ({ setValue }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  // Handle the option select
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    hideMenu();
    setValue('education', option, { shouldDirty: true });
  };

  const { t } = useTranslation();
  const theme = useTheme(); // Get the theme object

  return (
    <View style={{ marginTop: 10 }}>
      <>
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          anchor={
            <Button
              onPress={showMenu}
              style={{
                borderColor: theme.colors.primary,
                borderStyle: 'solid',
                borderWidth: 1,
              }} // Set the border color to the primary color of the theme
            >
              {selectedOption || t('personalInfo.education')}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => handleOptionSelect('None')}
            title={t('personalInfo.educationLevels.none')}
          />
          <Menu.Item
            onPress={() => handleOptionSelect('School')}
            title={t('personalInfo.educationLevels.school')}
          />
          <Menu.Item
            onPress={() => handleOptionSelect('High School')}
            title={t('personalInfo.educationLevels.highSchool')}
          />
          <Menu.Item
            onPress={() => handleOptionSelect('Undergraduate')}
            title={t('personalInfo.educationLevels.undergraduate')}
          />
          <Menu.Item
            onPress={() => handleOptionSelect('Postgraduate')}
            title={t('personalInfo.educationLevels.postgraduate')}
          />
        </Menu>
        {/* <Button onPress={() => onChange(selectedOption)}>{value}</Button> */}
      </>
    </View>
  );
};

export default EducationSelect;
