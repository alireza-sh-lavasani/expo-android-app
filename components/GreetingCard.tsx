import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const GreetingCard = () => {
  const currentDate = moment().format('DD MMMM YYYY');
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant='titleLarge' style={styles.title}>{t('greetings.title')}</Text>
          <Text variant='bodyMedium' style={styles.paragraph}>
            {t('greetings.paragraph')}
          </Text>
          <Text variant='bodyMedium' style={styles.paragraph}>
            {t('greetings.location')} Pilot Test Center
          </Text>
        </View>
        <Text variant='bodyMedium' style={styles.date}>{currentDate}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    fontFamily: 'Arial',
    marginBottom: 10,
  },
  date: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});

export default GreetingCard;
