import { shallow } from 'enzyme';
import React from 'react';
import AlertCollection from '../AlertCollection';

describe('TestCollection Component', () => {
  const props = {
    alerts: [
      {
        id: 'id-1',
        enabled: true,
        name: 'my alert 1',
        subaccount_id: 101,
        alert_metric: 'monthly_sending_limit'
      },
      {
        id: 'id-2',
        enabled: false,
        name: 'my alert 2',
        alert_metric: 'monthly_sending_limit'
      },
      {
        id: 'id-3',
        enabled: true,
        name: 'my alert 3',
        alert_metric: 'another_metric'
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

  it('should toggleDelete', () => {
    const actionCol = shallow(wrapper.instance().getRowData(props.alerts[0]).pop());
    actionCol.find('ActionList').prop('actions')[1].onClick();
    expect(props.toggleDelete).toHaveBeenCalledWith({ id: 'id-1', subaccount_id: 101, name: 'my alert 1' });
  });
});
