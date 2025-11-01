import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Menu, Surface, Text, TextInput } from 'react-native-paper';
import { ITest, tests } from './tests';

const SingleTest = ({ index }: { index: number }) => {
  const [testMenuVisible, setTestMenuVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState<ITest | null>(null);
  const [testResults, setTestResults] = useState<string>('');

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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: isTablet ? 100 : 0,
    },
    inputContainer: {
      flex: 1,
      margin: 5,
    },
    surface: {
      padding: 20,
      borderRadius: 4,
      elevation: 4,
      backgroundColor: '#eae3ff',
      marginBottom: 20,
    },
    row: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      title: {
        marginEnd: 10,
      },
    },
    textArea: {
      minHeight: 175,
      flex: 1,
    },
  });

  return (
    <>
      <Surface style={styles.surface}>
        <View style={styles.container}>
          {/* Select test */}
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.row.title}>
              {t('testsForm.test.label')} #{index + 1}:
            </Text>

            <Menu
              visible={testMenuVisible}
              onDismiss={() => setTestMenuVisible(false)}
              anchor={
                <Button
                  onPress={() => setTestMenuVisible(true)}
                  mode="elevated"
                >
                  {selectedTest !== null
                    ? selectedTest.title
                    : t('testsForm.test.button')}
                </Button>
              }
            >
              {tests.map((test, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setSelectedTest(test);
                    setTestMenuVisible(false);
                  }}
                  title={test.title}
                />
              ))}
            </Menu>
          </View>
        </View>

        {/* Test Results */}
        <View style={styles.container}>
          <TextInput
            style={styles.textArea}
            label="Test Results"
            mode="outlined"
            value={testResults}
            onChangeText={text => {
              setTestResults(text);
            }}
            multiline={true}
            dense={true}
          />
        </View>
      </Surface>
    </>
  );
};

export default SingleTest;
