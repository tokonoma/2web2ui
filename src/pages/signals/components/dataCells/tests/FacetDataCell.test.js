import React from 'react';
import { shallow } from 'enzyme';
import FacetDataCell from '../FacetDataCell';
import { MAILBOX_PROVIDERS } from 'src/constants';

jest.mock('src/hooks/useHibanaOverride', () => styles => styles);

describe('FacetDataCell', () => {
  const subject = (props = {}) =>
    shallow(<FacetDataCell dimension="example" facet="domain" id="example.com" {...props} />);

  it('renders page link', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders page link for master account', () => {
    expect(subject({ facet: 'sid', id: 0 })).toMatchSnapshot();
  });

  it('renders label for all accounts', () => {
    expect(subject({ facet: 'sid', id: -1 })).toMatchSnapshot();
  });

  it('renders page link with subaccount search', () => {
    expect(subject({ subaccountId: 123 })).toMatchSnapshot();
  });

  it('renders page link with name and id', () => {
    const props = {
      facet: 'sid',
      id: 123,
      name: 'Test Subaccount',
    };
    const wrapper = subject(props);
    expect(wrapper.find('PageLink').prop('children')).toEqual('Test Subaccount (123)');
    expect(wrapper).toMatchSnapshot();
  });

  it('formats mailbox provider label to friendly value', () => {
    const props = {
      facet: 'mb_provider',
      id: 'other',
    };
    const wrapper = subject(props);
    expect(wrapper.find('PageLink').prop('children')).toEqual(MAILBOX_PROVIDERS.other);
    expect(wrapper).toMatchSnapshot();
  });

  it('adds a class to truncate its contents', () => {
    expect(subject({ truncate: true })).toMatchSnapshot();
  });
});
