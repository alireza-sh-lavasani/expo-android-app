import { EIdType } from '@alireza-lavasani/afiyet-common';
import { Examination } from '../../models/examination.model';
import { Patient } from '../../models/patient.model';
import { EFormModes, EVisitSteps } from './visit.enum';

export interface IRenderVisitStepProps {
  currentTab: EVisitSteps;
  setCurrentTab: (currentTab: EVisitSteps) => void;
  personalInfoFormData?: Patient;
  setPersonalInfoFormData: (personalInfoFormData: Patient) => void;
  examinationFormData?: Examination;
  setExaminationFormData: (examinationFormData: Examination) => void;
}

export interface IPersonalInfoProps {
  mode: EFormModes;
  patientData?: Patient;
}

export interface IExaminationProps {
  examinationFormData?: Examination;
  patientId: string;
  mode: EFormModes;
  examinationId?: string;
  idType: EIdType;
}
