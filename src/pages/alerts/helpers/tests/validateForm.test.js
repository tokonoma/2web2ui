import validateForm from '../validateForm';
import cases from 'jest-in-case';

const testCases = [
  {
    name: 'fails when required filter value field not present',
    formValues: { single_filter: { filter_type: 'mailbox_provider', filter_values: []}},
    errors: { single_filter: { filter_values: 'Required' }}
  },
  {
    name: 'passes validation',
    formValues: { single_filter: { filter_type: 'mailbox_provider', filter_values: ['b']}},
    errors: {}
  }
];

cases('Alert Form Validation: ', ({ formValues, errors }) => {
  expect(validateForm(formValues)).toEqual(errors);
}, testCases);
