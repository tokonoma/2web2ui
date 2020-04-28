import { shallow } from 'enzyme';
import React from 'react';
import * as dateHelpers from 'src/helpers/date';
import Detail from '../Detail';

jest.mock('src/helpers/date');

let props;
let wrapper;

beforeEach(() => {
  dateHelpers.formatDateTime = jest.fn(() => 'formatted-date');
  props = {
    open: false,
    onCancel: jest.fn(),
    suppression: {
      recipient: 'foo@bar.com',
      description: '',
      updated: '2018-01-16T04:14:18.661Z',
      created: '2018-01-16T04:14:18.661Z',
    },
  };

  wrapper = shallow(<Detail {...props} />);
});

describe('Detail', () => {
  it('renders data correctly', () => {
    wrapper.setProps({ open: true });
    expect(wrapper).toMatchSnapshot();
  });
});
