import {
    EIdType,
    ESyncEntity,
    ESyncOperation,
    ISyncCreateExaminationDto,
    ISyncCreateExaminationMetaData,
} from '@alireza-lavasani/afiyet-common';
import { useRealm } from '@realm/react';
import { nanoid } from 'nanoid';
import { ICreateExaminationDto } from '../dto/createExamination.dto';
import { Examination } from '../models/examination.model';
import { usePatientService } from './patient.service';
import { SyncService } from './sync.service';

export const useExaminationService = (patientId: string, idType: EIdType) => {
  const realm = useRealm();
  const { getPatientById } = usePatientService();
  const syncService = new SyncService(realm);

  /**************************************
   ******** Create new examination ********
   *************************************/
  const createExamination = (
    examinationData: ICreateExaminationDto
  ): Examination => {
    try {
      const examinationId = nanoid();

      return realm.write(() => {
        // Create a new examination
        const newExamination = realm.create('Examination', {
          ...examinationData,
          _id: nanoid(),
          examinationId,
        });

        console.log('[Examination Service] Examination created successfully!');

        let examinationSyncRecord: ISyncCreateExaminationDto;

        // Examination sync record data
        examinationSyncRecord = {
          entity: ESyncEntity.EXAMINATION,
          operation: ESyncOperation.CREATE,
          data: { ...examinationData, examinationId },
          metaData: JSON.stringify({
            patientId,
            idType,
          }) as unknown as ISyncCreateExaminationMetaData,
        };

        // @ts-ignore
        examinationSyncRecord.data = JSON.stringify(examinationSyncRecord.data); // Convert sync data to string

        syncService.createSyncRecord(examinationSyncRecord); // Create new sync record

        const patient = getPatientById(patientId); // Get the patient by ID

        // Add the new examination to the patient's examinations list
        patient!.examinations.push(newExamination.examinationId);
        patient!.updatedAt = new Date();

        console.log(
          `[Examination Service] New examination for patient ${patientId} created!`
        );

        return newExamination as unknown as Examination;
      });
    } catch (error) {
      console.error(
        `Error creating examination for patient ${patientId} `,
        error
      );
      throw error;
    }
  };

  /**************************************
   ******** Get examination by ID ********
   *************************************/
  const getExaminationById = (
    examinationId: string
  ): Examination | undefined => {
    try {
      const examination = realm
        .objects<Examination>('Examination')
        .filtered(`examinationId == "${examinationId}"`)[0];

      return examination as unknown as Examination;
    } catch (error) {
      console.error('Error getting examination by ID:', error);
      throw error;
    }
  };

  /**************************************
   ******** Get all patient examinations
   *************************************/
  const getPatientExaminations = (): Examination[] | undefined => {
    try {
      const patient = getPatientById(patientId);

      let examinations: Examination[];

      if (patient) {
        examinations = patient.examinations.map(
          examinationId => getExaminationById(examinationId) as Examination
        );
      }

      // @ts-ignore
      return examinations;
    } catch (error) {
      console.error(`[Examination Service] Failed to get patient examinations`);
    }
  };

  /**************************************
   ******** Update examination ********
   *************************************/
  const updateExamination = (
    id: string,
    examinationData: ICreateExaminationDto
  ) => {
    try {
      const examination = getExaminationById(id); // Get the examination by ID

      // If the examination exists, update it
      if (examination) {
        realm.write(() => {
          Object.keys(examinationData).forEach(key => {
            // @ts-ignore
            if (examinationData[key]) {
              // @ts-ignore
              examination[key] = examinationData[key];
            }
          });

          examination.updatedAt = new Date();
          console.log(
            `[Examination Service] Examination with id ${id} updated!`
          );

          // Examination sync record data
          const examinationSyncRecord = {
            entity: ESyncEntity.EXAMINATION,
            operation: ESyncOperation.UPDATE,
            data: JSON.stringify(examinationData),
          };

          syncService.createSyncRecord(examinationSyncRecord); // Create new sync record
        });
      } else {
        console.error(`Examination with id ${id} not found!`);
        throw new Error(`Examination with id ${id} not found!`);
      }
    } catch (error) {
      console.error(`Error updating examination with id ${id}`, error);
      throw error;
    }
  };

  /**************************************
   ******** Delete examination ********
   *************************************/
  const deleteExamination = (id: string) => {
    try {
      const examination = getExaminationById(id);
      if (examination) {
        realm.write(() => {
          realm.delete(examination);
          console.log(
            `[Examination Service] Examination with id ${id} deleted!`
          );

          // Examination sync record data
          const examinationSyncRecord = {
            entity: ESyncEntity.EXAMINATION,
            operation: ESyncOperation.DELETE,
            data: JSON.stringify({ examinationId: id }),
          };

          syncService.createSyncRecord(examinationSyncRecord); // Create new sync record
        });
      } else {
        console.error(`Examination with id ${id} not found!`);
        throw new Error(`Examination with id ${id} not found!`);
      }
    } catch (error) {
      console.error(`Error deleting examination with id ${id}`, error);
      throw error;
    }
  };

  return {
    createExamination,
    getExaminationById,
    updateExamination,
    deleteExamination,
    getPatientExaminations,
  };
};
