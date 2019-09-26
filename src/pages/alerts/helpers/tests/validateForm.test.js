import validateForm from '../validateForm';
import cases from 'jest-in-case';

const validFormValues = {
  single_filter: { filter_type: 'mailbox_provider', filter_values: ['b']},
  emails: 'myEmail@email.com'
};

const testCases = [
  {
    name: 'fails when required filter value field not present',
    formValues: { ...validFormValues, single_filter: { filter_type: 'mailbox_provider', filter_values: []}},
    errors: { single_filter: { filter_values: 'Required' }}
  },
  {
    name: 'fails when all notification channels are empty',
    formValues: { ...validFormValues, emails: '', slack: '', webhook: '' },
    errors: {
      emails: 'At least one notification channel must not be empty',
      slack: 'At least one notification channel must not be empty',
      webhook: 'At least one notification channel must not be empty'
    }
  },
  {
    name: 'passes validation',
    formValues: validFormValues,
    errors: {}
  }
];

cases('Alert Form Validation: ', ({ formValues, errors }) => {
  expect(validateForm(formValues)).toEqual(errors);
}, testCases);
