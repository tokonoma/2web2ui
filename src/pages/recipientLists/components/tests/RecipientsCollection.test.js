import React from 'react';
import { shallow } from 'enzyme';

import RecipientsCollection from '../RecipientsCollection';

describe('RecipientsCollection', () => {
  let props;
  let wrapper;
  let recipients;

  beforeEach(() => {
    props = {
      recipients: []
    };
    recipients = [
      { address: { name: 'foo', email: 'foo@domain.com' }},
      { address: { name: 'bar', email: 'bar@domain.com' }}
    ];

    wrapper = shallow(<RecipientsCollection {...props} />);
  });

  it('renders correctly with no recipients', () => {
    wrapper.setProps({ hasCsv: true });
    expect(wrapper.find('p')).toHaveText('There are no valid recipients in your uploaded CSV!');
  });

  it('renders collection correctly', () => {
    wrapper.setProps({
      hasCsv: true,
      recipients
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('getRowData', () => {
    it('returns formatted recipient', () => {
      expect(wrapper.instance().getRowData(recipients[0])).toEqual([recipients[0].address.email, recipients[0].address.name]);
    });
  });
});

