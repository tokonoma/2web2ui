import { shallow } from 'enzyme';
import React from 'react';
import IncidentsCollection from '../IncidentsCollection';

describe('Blacklist Component: IncidentsCollection', () => {
  const incidents = [
    {
      id: 1,
      resource: '101.101',
      blacklist_code: 'spammy mcspamface',
      occurred_at_formatted: 'Dec 3 2019 at 10:00am',
      occurred_at_timestamp: 123456789,
    },
  ];
  const subject = ({ ...props }) => {
    const defaults = { incidents };

    return shallow(<IncidentsCollection {...defaults} {...props} />);
  };

  it('renders page correctly', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the rows correctly', () => {
    const wrapper = subject();
    const rowFn = wrapper.props().getRowData;
    const rowWrapper = rowFn(incidents[0]);
    expect(rowWrapper).toMatchSnapshot();
  });
});
