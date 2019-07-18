import _ from 'lodash';
import { isEmailAddress } from 'src/helpers/email';

export default function validateEmailList(values) {
  if (!values.length) {
    return;
  }
  const splitValues = _.flatMap(values.split('\n').map((email) => email.split(',')));
  const emails = _.map(splitValues, (value) => _.trim(value));
  const invalidEmails = emails.filter((email) => !isEmailAddress(email));

  if (invalidEmails.length) {
    if (emails.length === 1) {
      return 'Must enter at least one valid Email Addresses';
    }

    return 'Must be a list of valid Email Addresses';
  }

}
