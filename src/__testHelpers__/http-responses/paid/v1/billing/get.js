export default ({ params }) => ({
  results: {
    first_name: null,
    last_name: null,
    address1: null,
    address2: null,
    city: null,
    state: 'MD',
    country_code: 'US',
    zip_code: '12345',
    email: 'test-email@sparkpost.test',
    credit_card: {
      id: '2c92c0fb63ed6e0a0163f1c7bec25b52',
      type: 'Visa',
      number: '************1111',
      expiration_month: 4,
      expiration_year: 2022
    }
  }
});
