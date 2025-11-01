import {
    ESyncEntity,
    ESyncOperation,
    ISyncCreatePatientDto,
    ISyncDeletePatientDto,
    ISyncUpdatePatientDto,
    generatePatientIdInitials,
} from '@alireza-lavasani/afiyet-common';
import { useRealm } from '@realm/react';
import { nanoid } from 'nanoid';
import { ICreatePatientDto } from '../dto/createPatient.dto';
import { Patient } from '../models/patient.model';
import { randomId } from '../utils/random-id';
import { SyncService } from './sync.service';

export const usePatientService = () => {
  const realm = useRealm();
  const syncService = new SyncService(realm);

  /**************************************
   ******** Create new patient ********
   *************************************/
  const createPatient = (patientData: ICreatePatientDto): Patient => {
    try {
      return realm.write(() => {
        // Get the patient ID initials
        const { namePart, dateKey } = generatePatientIdInitials(
          patientData.fullName,
          // @ts-ignore
          patientData.birthDate
        );

        // Generate a tmp patient ID
        const tmpPatientId = `${namePart}${dateKey}${randomId(7)}`;

        // Create a new patient
        const createdPatient = realm.create('Patient', {
          ...patientData,
          _id: nanoid(),
          tmpPatientId,
        });

        console.log('[Patient Service] Patient created successfully!');

        // Sync record data
        const syncRecord: ISyncCreatePatientDto = {
          entity: ESyncEntity.PATIENT,
          operation: ESyncOperation.CREATE,
          data: { ...patientData, tmpPatientId: createdPatient.tmpPatientId },
        };

        // @ts-ignore
        syncRecord.data = JSON.stringify(syncRecord.data); // Convert sync data to string

        // Create new sync record
        syncService.createSyncRecord(syncRecord);

        return createdPatient as unknown as Patient;
      });
    } catch (error) {
      console.error('[Patient Service] Error creating patient:', error);
      throw error;
    }
  };

  /**************************************
   ******** Get patient by ID ********
   *************************************/
  const getPatientById = (id: string): Patient | undefined => {
    try {
      const patient = realm
        .objects<Patient>('Patient')
        .filtered(`patientId == "${id}" OR tmpPatientId == "${id}"`)[0];

      return patient as unknown as Patient;
    } catch (error) {
      console.error('Error getting patient by ID:', error);
      throw error;
    }
  };

  /**************************************
   ******** Get all patients ********
   *************************************/
  const getAllPatients = (): Patient[] => {
    try {
      return Array.from(
        realm.objects<Patient>('Patient').sorted('updatedAt').slice()
      );
    } catch (error) {
      console.error('Error getting all patients:', error);
      throw error;
    }
  };

  /**************************************
   ******** Update patient ********
   *************************************/
  const updatePatient = (id: string, patientData: ICreatePatientDto) => {
    try {
      const patient = getPatientById(id); // Get the patient by ID

      // Update the patient data
      if (patient) {
        realm.write(() => {
          Object.keys(patientData).forEach(key => {
            if (patientData[key as keyof ICreatePatientDto]) {
              // @ts-ignore
              patient[key as keyof ICreatePatientDto] =
                patientData[key as keyof ICreatePatientDto];
            }
          });
          patient.updatedAt = new Date();

          // Sync record data
          const syncRecord: ISyncUpdatePatientDto = {
            entity: ESyncEntity.PATIENT,
            operation: ESyncOperation.UPDATE,
            data: patientData,
          };

          // @ts-ignore
          syncRecord.data = JSON.stringify(syncRecord.data); // Convert sync data to string

          // Create new sync record
          syncService.createSyncRecord(syncRecord);
        });

        console.log(`Patient updated successfully!`);
      } else {
        console.error('Patient not found!');
        throw new Error('Patient not found!');
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  };

  /**************************************
   ******** Delete patient ********
   *************************************/
  const deletePatient = (id: string) => {
    try {
      const patient = getPatientById(id);
      if (patient) {
        realm.write(() => {
          realm.delete(patient);

          // Sync record data
          const syncRecord: ISyncDeletePatientDto = {
            entity: ESyncEntity.PATIENT,
            operation: ESyncOperation.DELETE,
            data: {},
          };

          if (patient.tmpPatientId)
            syncRecord.data.tmpPatientId = patient.tmpPatientId;

          if (patient.patientId) syncRecord.data.patientId = patient.patientId;

          // @ts-ignore
          syncRecord.data = JSON.stringify({ patientId: id }); // Convert sync data to string
        });

        console.log('Patient deleted successfully!');
      } else {
        console.error('Patient not found!');
        throw new Error('Patient not found!');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  };

  return {
    createPatient,
    getPatientById,
    getAllPatients,
    updatePatient,
    deletePatient,
    patients: getAllPatients(),
  };
};
