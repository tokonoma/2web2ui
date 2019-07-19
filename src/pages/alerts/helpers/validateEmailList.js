import { isEmailAddress } from 'src/helpers/email';
import { stringToArrayNewlineAndCommaDelimited } from 'src/helpers/string';

export default function validateEmailList(values) {
  if (!values.length) {
    return;
  }
  const emails = stringToArrayNewlineAndCommaDelimited(values);
  const invalidEmails = emails.filter((email) => !isEmailAddress(email));

  if (invalidEmails.length) {
    if (emails.length === 1) {
      return 'Must enter at least one valid Email Addresses';
    }

    return 'Must be a list of valid Email Addresses';
  }

}
