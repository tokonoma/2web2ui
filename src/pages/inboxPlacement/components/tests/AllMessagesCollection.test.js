import React from 'react';
import { shallow, mount } from 'enzyme';
import cases from 'jest-in-case';
import { BrowserRouter as Router } from 'react-router-dom';


import { AllMessagesCollection, passFail } from '../AllMessagesCollection';

describe('Component: AllMessagesCollection', () => {

  const mockGetMessage = jest.fn();
  const defaultProps = {
    data: [],
    loading: false,
    id: 101,
    getInboxPlacementMessage: mockGetMessage
  };
  const subject = ({ ...props }) => shallow(<AllMessagesCollection {...defaultProps} {...props}/>);

  it('renders correctly with no data', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly with data', () => {
    const data = [
      {
        id: 0,
        email_address: 'fido@dogmail.com',
        folder: 'spam',
        tab: null,
        dkim: 'pass',
        spf: 'pass',
        dmarc: 'pass'
      },
      {
        id: 1,
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

  describe('message headers', () => {

    const data = [
      {
        id: 0,
        headers: 'foo'
      },
      {
        id: 1
      }
    ];
    const mountedSubject = ({ ...props }) => mount(<Router><AllMessagesCollection {...defaultProps} {...props}/></Router>);
    const click = (id, wrapper) => {
      const row = wrapper.find('Collection').find('TableBody').findWhere((n) => n.name() === 'RowComponent' && n.prop('id') === id);
      row.find('Button').simulate('click');
    };

    it('dispatches the getMessage action when the open link is clicked', () => {
      const wrapper = mountedSubject({ data });
      click(1, wrapper);
      expect(mockGetMessage).toHaveBeenCalled();
    });

    it('renders the headers if the open link is clicked and headers exist', () => {
      const wrapper = mountedSubject({ data });
      expect(wrapper.find('CodeBlock')).not.toExist();
      click(0, wrapper);
      expect(wrapper.find('CodeBlock')).toExist();
    });

    it('un-renders the headers if the close link is clicked (when headers are already open)', () => {
      const wrapper = mountedSubject({ data });
      expect(wrapper.find('CodeBlock')).not.toExist();
      click(0, wrapper);
      expect(wrapper.find('CodeBlock')).toExist();
      click(0, wrapper);
      expect(wrapper.find('CodeBlock')).not.toExist();
    });
  });
});
