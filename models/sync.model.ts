import { ESyncEntity, ESyncOperation, ISyncBaseDto } from '@alireza-lavasani/afiyet-common';
import { nanoid } from 'nanoid';
import { Object, ObjectSchema } from 'realm';

export class Sync extends Object implements ISyncBaseDto {
  _id!: string;
  entity!: ESyncEntity;
  operation!: ESyncOperation;
  data!: string;
  metaData?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema: ObjectSchema = {
    name: 'Sync',
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
      entity: {
        type: 'string',
      },
      operation: {
        type: 'string',
      },
      data: {
        type: 'string',
      },
      metaData: {
        type: 'string',
        optional: true,
      },
    },
  };
}
