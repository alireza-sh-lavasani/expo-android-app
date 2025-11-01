import { Realm } from '@realm/react';
import { Patient } from './patient.model';
import { nanoid } from 'nanoid'

export class Test extends Realm.Object {
  _id!: string;
  name!: string;
  patients!: Patient[];
  createdAt!: Date;
  updatedAt!: Date;

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Test',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'string',
        default: nanoid(),
      },
      name: 'string',
      tasks: 'Patient[]',
      createdAt: {
        type: 'date',
        default: new Date(),
      },
      updatedAt: {
        type: 'date',
        default: new Date(),
      },
    },
  };
}
