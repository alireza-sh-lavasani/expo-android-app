import { IExamination } from '@alireza-lavasani/afiyet-common';
import { nanoid } from 'nanoid';
import Realm, { ObjectSchema } from 'realm';

export class Examination extends Realm.Object implements IExamination {
  _id!: string;
  examinationId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  zoba!: string;
  subZoba!: string;
  address!: string;
  bloodPressureDiastolic!: string;
  bloodPressureSystolic!: string;
  bloodSugar!: string;
  heartRate!: string;
  latitude!: string;
  localDistrict!: string;
  longitude!: string;
  oxygenSaturation!: string;
  respiratoryRate!: string;
  temperature!: string;
  hasFever!: boolean;
  hasHeadache!: boolean;
  hasDizziness!: boolean;
  hasNausea!: boolean;
  hasFatigue!: boolean;
  hasWeightLoss!: boolean;
  hasSweating!: boolean;
  hasCough!: boolean;
  hasShortnessOfBreath!: boolean;
  hasSoreThroat!: boolean;
  hasChestPain!: boolean;
  hasVomiting!: boolean;
  hasDiarrhea!: boolean;
  hasStomachPain!: boolean;
  hasConstipation!: boolean;
  hasAppetiteLoss!: boolean;
  hasMusclePain!: boolean;
  hasJointPain!: boolean;
  hasBackPain!: boolean;
  hasNeckPain!: boolean;
  hasNumbness!: boolean;
  hasSeizures!: boolean;
  hasDifficultySpeaking!: boolean;
  hasRash!: boolean;
  hasItching!: boolean;
  hasBruising!: boolean;
  hasPainfulUrination!: boolean;
  hasFrequentUrination!: boolean;
  hasBloodInUrine!: boolean;
  hasEarPain!: boolean;
  hasHearingLoss!: boolean;
  hasNasalCongestion!: boolean;
  hasRunnyNose!: boolean;
  hasSneezing!: boolean;
  hasEyePain!: boolean;
  hasRedEye!: boolean;
  hasBlurredVision!: boolean;
  hasVisionLoss!: boolean;

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema: ObjectSchema = {
    name: 'Examination',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'string',
        default: nanoid(),
      },
      examinationId: {
        type: 'string',
        default: nanoid(),
      },
      createdAt: {
        type: 'date',
        default: new Date(),
      },
      updatedAt: {
        type: 'date',
        default: new Date(),
      },
      zoba: {
        type: 'string',
        default: '',
      },
      subZoba: {
        type: 'string',
        default: '',
      },
      address: {
        type: 'string',
        default: '',
      },
      bloodPressureDiastolic: {
        type: 'string',
        default: '',
      },
      bloodPressureSystolic: {
        type: 'string',
        default: '',
      },
      bloodSugar: {
        type: 'string',
        default: '',
      },
      heartRate: {
        type: 'string',
        default: '',
      },
      latitude: {
        type: 'string',
        default: '',
      },
      localDistrict: {
        type: 'string',
        default: '',
      },
      longitude: {
        type: 'string',
        default: '',
      },
      oxygenSaturation: {
        type: 'string',
        default: '',
      },
      respiratoryRate: {
        type: 'string',
        default: '',
      },
      temperature: {
        type: 'string',
        default: '',
      },
      hasFever: {
        type: 'bool',
        default: false,
      },
      hasHeadache: {
        type: 'bool',
        default: false,
      },
      hasDizziness: {
        type: 'bool',
        default: false,
      },
      hasNausea: {
        type: 'bool',
        default: false,
      },
      hasFatigue: {
        type: 'bool',
        default: false,
      },
      hasWeightLoss: {
        type: 'bool',
        default: false,
      },
      hasSweating: {
        type: 'bool',
        default: false,
      },
      hasCough: {
        type: 'bool',
        default: false,
      },
      hasShortnessOfBreath: {
        type: 'bool',
        default: false,
      },
      hasSoreThroat: {
        type: 'bool',
        default: false,
      },
      hasChestPain: {
        type: 'bool',
        default: false,
      },
      hasVomiting: {
        type: 'bool',
        default: false,
      },
      hasDiarrhea: {
        type: 'bool',
        default: false,
      },
      hasStomachPain: {
        type: 'bool',
        default: false,
      },
      hasConstipation: {
        type: 'bool',
        default: false,
      },
      hasAppetiteLoss: {
        type: 'bool',
        default: false,
      },
      hasMusclePain: {
        type: 'bool',
        default: false,
      },
      hasJointPain: {
        type: 'bool',
        default: false,
      },
      hasBackPain: {
        type: 'bool',
        default: false,
      },
      hasNeckPain: {
        type: 'bool',
        default: false,
      },
      hasNumbness: {
        type: 'bool',
        default: false,
      },
      hasSeizures: {
        type: 'bool',
        default: false,
      },
      hasDifficultySpeaking: {
        type: 'bool',
        default: false,
      },
      hasRash: {
        type: 'bool',
        default: false,
      },
      hasItching: {
        type: 'bool',
        default: false,
      },
      hasBruising: {
        type: 'bool',
        default: false,
      },
      hasPainfulUrination: {
        type: 'bool',
        default: false,
      },
      hasFrequentUrination: {
        type: 'bool',
        default: false,
      },
      hasBloodInUrine: {
        type: 'bool',
        default: false,
      },
      hasEarPain: {
        type: 'bool',
        default: false,
      },
      hasHearingLoss: {
        type: 'bool',
        default: false,
      },
      hasNasalCongestion: {
        type: 'bool',
        default: false,
      },
      hasRunnyNose: {
        type: 'bool',
        default: false,
      },
      hasSneezing: {
        type: 'bool',
        default: false,
      },
      hasEyePain: {
        type: 'bool',
        default: false,
      },
      hasRedEye: {
        type: 'bool',
        default: false,
      },
      hasBlurredVision: {
        type: 'bool',
        default: false,
      },
      hasVisionLoss: {
        type: 'bool',
        default: false,
      },
    },
  };
}
