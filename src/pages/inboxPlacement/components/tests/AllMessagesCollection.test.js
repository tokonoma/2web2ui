import React from 'react';
import { shallow } from 'enzyme';
import cases from 'jest-in-case';

import AllMessagesCollection, { passFail } from '../AllMessagesCollection';

describe('Component: AllMessagesCollection', () => {
  const subject = ({ ...props }) => shallow(<AllMessagesCollection data={[]} {...props}/>);

  it('renders correctly with no data', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly with data', () => {
    const data = [
      {
        email_address: 'fido@dogmail.com',
        folder: 'spam',
        tab: null,
        dkim: 'pass',
        spf: 'pass',
        dmarc: 'pass'
      },
      {
        email_address: 'sparky@gmail.com',
        folder: 'inbox',
        tab: 'promotion',
        dkim: 'pass',
        spf: null,
        dmarc: 'fail'
      }
    ];

    expect(subject({ data })).toMatchSnapshot();
  });

  describe('helper: passFail function', () => {
    const testCases = [
      { name: 'Pass', input: 'pass' },
      { name: 'Fail', input: 'fail' },
      { name: 'null', input: null },
      { name: 'other results', input: 'foofoo' }
    ];

    cases('returns correct value for an input of', ({ input }) => {
      expect(passFail(input)).toMatchSnapshot();
    }, testCases);
  });

});
