import { IPatient } from '@alireza-lavasani/afiyet-common';
import { Examination } from '../models/examination.model';

export interface ICreatePatientDto extends Partial<IPatient> {
  education: string;
  emmergencyContact: string;
  fullName: string;
  gender: string;
  maritalStatus: string;
  uniqueGovID: string;
  birthDate: Date;
}

export interface IPatientData extends ICreatePatientDto {
  id: string;
  examinations?: Examination[];
}
