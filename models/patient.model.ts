import { Realm } from '@realm/react';
import { ObjectSchema } from 'realm';
import { IPatient } from '@alireza-lavasani/afiyet-common';
import { nanoid } from 'nanoid';
export class Patient extends Realm.Object implements IPatient {
  _id!: string;
  createdAt!: Date;
  updatedAt!: Date;
  age!: string;
  education!: string;
  emmergencyContact!: string;
  fullName!: string;
  gender!: string;
  maritalStatus!: string;
  uniqueGovID!: string;
  examinations!: Realm.List<string>; // Define a one-to-many relationship
  birthDate!: Date;
  patientId!: string;
  tmpPatientId!: string;
  image?: PatientImage;

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema: ObjectSchema = {
    name: 'Patient',
    primaryKey: '_id',
    properties: {
      _id: {
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
      birthDate: {
        type: 'date',
      },
      education: {
        type: 'string',
        optional: true,
      },
      emmergencyContact: {
        type: 'string',
        optional: true,
      },
      fullName: {
        type: 'string',
      },
      gender: {
        type: 'string',
      },
      maritalStatus: {
        type: 'string',
      },
      uniqueGovID: {
        type: 'string',
        optional: true,
      },
      examinations: 'string[]',
      patientId: {
        type: 'string',
        optional: true,
        indexed: true,
      },
      tmpPatientId: {
        type: 'string',
        optional: true,
        indexed: true,
      },
      image: {
        type: 'object',
        objectType: 'PatientImage', // Define the nested object type
        optional: true,
      },
    },
  };
}

// Define the Image model schema
export class PatientImage extends Realm.Object {
  uri?: string;
  base64?: string;

  static schema: ObjectSchema = {
    name: 'PatientImage',
    properties: {
      uri: 'string',
      base64: 'string',
    },
  };
}
