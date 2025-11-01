import Realm, { BSON, ObjectSchema } from 'realm';
import { ESupportedLanguages } from '../languages/language.enums';

export class AppLanguage extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  createdAt!: Date;
  updatedAt!: Date;
  language!: ESupportedLanguages;

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema: ObjectSchema = {
    primaryKey: '_id',
    name: 'AppLanguage',
    properties: {
      _id: {
        type: 'objectId',
        default: new BSON.ObjectId(),
      },
      createdAt: {
        type: 'date',
        default: new Date(),
      },
      updatedAt: {
        type: 'date',
        default: new Date(),
      },
      language: {
        type: 'string',
        default: ESupportedLanguages.ENGLISH,
      },
    },
  };
}


