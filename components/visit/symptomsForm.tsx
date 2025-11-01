import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native';
import { Checkbox, Divider, Icon, Text } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { EFormModes } from './visit.enum';
import { Examination } from '../../models/examination.model';
import { useId } from 'react';

const SymptomForm = ({
  control,
  mode,
  examination,
  setValue,
}: {
  control?: any;
  mode: EFormModes;
  examination?: Examination;
  setValue?: Function;
}) => {
  const { t } = useTranslation();

  const id = useId();

  const symptomGroups = [
    {
      title: 'General Symptoms',
      symptoms: [
        'hasFever',
        'hasHeadache',
        'hasDizziness',
        'hasNausea',
        'hasFatigue',
        'hasWeightLoss',
        'hasSweating',
      ],
    },
    {
      title: 'Respiratory Symptoms',
      symptoms: [
        'hasCough',
        'hasShortnessOfBreath',
        'hasSoreThroat',
        'hasChestPain',
      ],
    },
    {
      title: 'Gastrointestinal Symptoms',
      symptoms: [
        'hasVomiting',
        'hasDiarrhea',
        'hasStomachPain',
        'hasConstipation',
        'hasAppetiteLoss',
      ],
    },
    {
      title: 'Musculoskeletal Symptoms',
      symptoms: ['hasMusclePain', 'hasJointPain', 'hasBackPain', 'hasNeckPain'],
    },
    {
      title: 'Neurological Symptoms',
      symptoms: ['hasNumbness', 'hasSeizures', 'hasDifficultySpeaking'],
    },
    {
      title: 'Dermatological Symptoms',
      symptoms: ['hasRash', 'hasItching', 'hasBruising'],
    },
    {
      title: 'Urinary Symptoms',
      symptoms: [
        'hasPainfulUrination',
        'hasFrequentUrination',
        'hasBloodInUrine',
      ],
    },
    {
      title: 'ENT (Ear, Nose, Throat) Symptoms',
      symptoms: [
        'hasEarPain',
        'hasHearingLoss',
        'hasNasalCongestion',
        'hasRunnyNose',
        'hasSneezing',
      ],
    },
    {
      title: 'Eye Symptoms',
      symptoms: [
        'hasEyePain',
        'hasRedEye',
        'hasBlurredVision',
        'hasVisionLoss',
      ],
    },
  ];

  return (
    <ScrollView>
      <View style={styles.card}>
        {symptomGroups.map((group, index) => (
          <View key={`${id}-${group}-${index}`}>
            <Text style={styles.header}>{group.title}</Text>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              {group.symptoms.map((symptom, index) => {
                if (mode === EFormModes.CREATE)
                  return (
                    <Controller
                      key={`${id}-${index}`}
                      name={`symptoms.${symptom}`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox.Item
                          mode="android"
                          style={styles.checkbox}
                          label={t(`visitSummary.symptoms.${symptom}`)}
                          status={value ? 'checked' : 'unchecked'}
                          onPress={() => {
                            if (setValue) setValue(symptom, !value); // Update the form state
                            onChange(!value); // Update the controller state
                          }}
                          color="#6750a4"
                        />
                      )}
                    />
                  );
                else
                  return (
                    <View
                      style={styles.keyValuePair}
                      key={`${id}-${symptom}-${index}`}
                    >
                      <Text style={styles.key}>
                        {t(`visitSummary.symptoms.${symptom}`)}:
                      </Text>
                      <Text style={styles.value}>
                        {examination &&
                        examination[symptom as keyof Examination] ? (
                          <Icon source="check" size={18} color="red" />
                        ) : (
                          '-'
                        )}
                      </Text>
                    </View>
                  );
              })}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  header: {
    fontSize: 16,
    color: '#6750a4',
    fontWeight: 'bold',
    marginTop: 10,
  },
  divider: {
    backgroundColor: '#6750a4',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  checkbox: {
    width: 'auto',
  },
  keyValuePair: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  key: {
    marginRight: 10,
    fontSize: 16,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SymptomForm;
