import { useLocalSearchParams } from 'expo-router';
import { usePatientService } from '../../../services/patient.service';
import PersonalInformationForm from '../../../components/visit/PersonalInfo';
import { EFormModes } from '../../../components/visit/visit.enum';

const UpdatePatientProfile = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>(); // This is a custom hook that returns the patient ID from the URL
  const { getPatientById } = usePatientService(); // This is a custom hook that returns a function to get a patient by ID

  const patientData = getPatientById(patientId as string); // Get the patient by ID

  return (
    <>
      <PersonalInformationForm
        mode={EFormModes.EDIT} // Set the mode to edit
        patientData={patientData}
      />
    </>
  );
};

export default UpdatePatientProfile;
