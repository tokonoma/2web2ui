import React from 'react';
import { shallow } from 'enzyme';
import IntegrationCollection from '../IntegrationCollection';
import cases from 'jest-in-case';

cases('IntegrationCollection', (props) => {
  const subject = () => (shallow(<IntegrationCollection {...props} />));
  expect(subject()).toMatchSnapshot();
},{
  'renders Error': {
    loadingStatus: 'fail'
  },
  'renders Loading': {
    loadingStatus: 'pending'
  },
  'renders no data found': {
    events: []
  },
  'renders Table': {
    events: [{
      batch_id: '8c4b19fb-07a2-42cb-84f7-3ab09a8049e0',
      expiration_timestamp: '2019-09-29T00:00:00.000Z',
      number_duplicates: 0,
      number_failed: 0,
      number_succeeded: 1,
      timestamp: '2019-09-18T20:09:38.000Z',
      type: 'success'
    }]
  }
});
