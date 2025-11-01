import { ESupportedTests } from './visit.enum';

export interface ITest {
  title: string;
  value: ESupportedTests;
}

export const tests: ITest[] = [
  {
    title: 'Test A',
    value: ESupportedTests.TEST_A,
  },
  {
    title: 'Test B',
    value: ESupportedTests.TEST_B,
  },
  {
    title: 'Test C',
    value: ESupportedTests.TEST_C,
  },
];
