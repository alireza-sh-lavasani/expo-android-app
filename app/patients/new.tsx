import PersonalInformationForm from '../../components/visit/PersonalInfo';
import { EFormModes } from '../../components/visit/visit.enum';

const NewPatient = () => {
  return (
    <>
      <PersonalInformationForm mode={EFormModes.CREATE} />
    </>
  );
};

export default NewPatient;
