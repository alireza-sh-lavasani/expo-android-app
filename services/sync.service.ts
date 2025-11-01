import { ISyncBaseDto } from '@alireza-lavasani/afiyet-common';
import { Realm } from '@realm/react';
import { nanoid } from 'nanoid';
import pako from 'pako';
import { Alert, BackHandler } from 'react-native';
import { appBackend } from '../api/app-backend';
import { Examination } from '../models/examination.model';
import { Patient } from '../models/patient.model';
import { eventEmitter } from '../utils/event-emmiter';
import { ESyncEvents } from './sync.enum';
import { IServerData } from './sync.interface';

export class SyncService {
  constructor(private readonly realm: Realm) {}

  /**************************************
   ******** Create new sync record ********
   *************************************/
  createSyncRecord = async (syncRecord: ISyncBaseDto) => {
    try {
      this.realm.create('Sync', { ...syncRecord, _id: nanoid() });

      console.log('[Sync Service] Sync record created successfully!');
    } catch (error) {
      console.error('[Sync Service] Error creating sync record: ', error);
    }
  };

  /**************************************
   ******** Sync App to server ********
   *************************************/
  syncAppToServer = async () => {
    try {
      const syncRecords = this.realm.objects('Sync'); // Get all sync records

      const jsonString = JSON.stringify(syncRecords); // Convert the JSON object to a string

      const compressedData = pako.deflate(jsonString); // Compress the JSON string using pako

      console.log('[Sync Service] Syncing records...');

      // Send the data to the server
      const { data } = await appBackend.post('/sync/buffer', compressedData, {
        headers: {
          'Content-Type': 'application/octet-stream', // Indicate binary data
        },
        responseType: 'arraybuffer', // Expect an arraybuffer response for compressed data
      });

      // Convert the response to a Uint8Array before decompressing
      const uint8ArrayResponse = new Uint8Array(data);

      // Decompress the response using pako.inflate
      const decompressedData = pako.inflate(uint8ArrayResponse, {
        to: 'string',
      });

      const latestData = JSON.parse(decompressedData);

      console.log('[Sync Service] Latest data received');

      // Sync latest data from the server
      await this.syncServerData(latestData);

      // Clear the sync records
      // this.realm.write(() => {
      //   this.realm.delete(syncRecords); // This will delete all sync records
      // });

      console.log('[Sync Service] All records synced successfully!');
    } catch (error) {
      console.error('[Sync Service] Error syncing records: ', error);
      console.error(error);
    }
  };

  /**************************************
   ******** Sync server to Tablet
   *************************************/
  syncServerToTablet = async () => {
    const latestData = await this.getLatestData();
    await this.syncServerData(latestData);
  };

  /**************************************
   ******** Get latest data
   *************************************/
  async getLatestData(): Promise<IServerData> {
    const { data } = await appBackend.get('/sync/latest-data');
    return data;
  }

  /**************************************
   ******** Handle server data
   * First creates or updates examinations
   * Then creates or updates patients
   *************************************/
  syncServerData = (latestData: IServerData) => {
    const { patients, examinations } = latestData;

    try {
      if (examinations.length) {
        // Update or create examinations
        for (const examination of examinations) {
          // Check if examination already exists
          const existingExamination: Examination = this.realm
            .objects<Examination>('Examination')
            .filtered(`examinationId == "${examination.examinationId}"`)[0];

          // Update existing examination
          if (existingExamination) {
            this.realm.write(() => {
              Object.keys(examination).forEach(key => {
                if (key != 'examinationId') {
                  // TODO fix types later
                  // @ts-expect-error
                  existingExamination[key] = examination[key];
                }
              });
              // TODO fix types later
              // @ts-expect-error TODO fix types later
              examination.updatedAt = new Date();
            });

            console.log(`[Sync Service] Examination updated successfully!`);
          }
          // Create new examination
          else {
            this.realm.write(() => {
              this.realm.create('Examination', {
                ...examination,
                _id: nanoid(),
              });
            });
            console.log(`[Sync Service] Examination created successfully!`);
          }
        }
      }

      if (patients.length) {
        // Update or create patients
        for (const patient of patients) {
          // Check if patient already exists
          const existingPatient: Patient = this.realm
            .objects<Patient>('Patient')
            .filtered(
              `patientId == "${patient.patientId}" OR tmpPatientId == "${patient.tmpPatientId}"`
            )[0];

          // Update existing patient
          if (existingPatient) {
            this.realm.write(() => {
              Object.keys(patient).forEach(key => {
                // TODO fix types later
                // @ts-expect-error
                existingPatient[key] = patient[key];
              });
              // TODO fix types later
              // @ts-expect-error TODO fix types later
              patient.updatedAt = new Date();
            });

            console.log(`[Sync Service] Patient updated successfully!`);
          }
          // Create new patient
          else {
            this.realm.write(() => {
              this.realm.create('Patient', {
                ...patient,
                _id: nanoid(),
              });
            });
            console.log(`[Sync Service] Patient created successfully!`);
          }
        }
      }

      eventEmitter.emit(ESyncEvents.SYNCED_LATEST_DATA);

      Alert.alert(
        'Latest data synced with the server',
        'Please close and reopen the app to refresh data.',
        [
          { text: 'Later' },
          {
            text: 'Close the App',
            style: 'destructive',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: true }
      );
    } catch (error: any) {
      console.error(`[Sync Service] Failed to sync server data`, error);
    }
  };
}
