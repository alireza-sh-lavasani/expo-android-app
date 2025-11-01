import { IExamination, IPatient } from '@alireza-lavasani/afiyet-common';

export interface IServerData {
  patients: IPatient[];
  examinations: IExamination[];
}
