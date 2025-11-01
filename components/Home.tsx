import React from 'react';
import PatientsList from './patientsList/PatientsList';
import GreetingCard from './GreetingCard';
import { ScrollView } from 'react-native';

const Home = () => {
  return (
    <>
      <ScrollView>
        <GreetingCard />
        <PatientsList />
      </ScrollView>
    </>
  );
};

export default Home;
