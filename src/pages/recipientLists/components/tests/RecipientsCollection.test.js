import React from 'react';
import { shallow } from 'enzyme';

import RecipientsCollection from '../RecipientsCollection';

describe('RecipientsCollection', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      recipients: []
    };

    wrapper = shallow(<RecipientsCollection {...props} />);
  });

  it('renders correctly when hasCsv is false', () => {
    wrapper.setProps({ hasCsv: false });
    expect(wrapper.find('p').text()).toEqual('Once you upload a CSV, recipients will be previewed here.');
  });

  it('renders correctly when hasCsv is true but no recipients', () => {
    wrapper.setProps({ hasCsv: true });
    expect(wrapper.find('p').text()).toEqual('There are no recipients in your uploaded CSV!');
  });

  it('renders collection correctly', () => {
    wrapper.setProps({
      hasCsv: true,
      recipients: [
        { address: { name: 'foo', email: 'foo@domain.com' }},
        { address: { name: 'bar', email: 'bar@domain.com' }}
      ]
    });

    expect(wrapper).toMatchSnapshot();
  });


});

