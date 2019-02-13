import { shallow } from 'enzyme';
import React from 'react';
import AlertCollection from '../AlertCollection';

describe('TestCollection Component', () => {
  const props = {
    alerts: [
      {
        id: 'id-1',
        name: 'my alert 1',
        enabled: true
      },
      {
        id: 'id-2',
        name: 'my alert 2',
        enabled: false
      },
      {
        id: 'id-3',
        name: 'my alert 3',
        enabled: true
      }
    ],
    toggleDelete: jest.fn()
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AlertCollection {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render row data properly', () => {
    props.alerts.forEach((alert) => {
      const row = wrapper.instance().getRowData(alert);
      expect(row).toMatchSnapshot();
    });
  });

  // it('should toggleDelete', () => {
  //
  // });
});
