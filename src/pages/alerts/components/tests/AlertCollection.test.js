import { shallow } from 'enzyme';
import React from 'react';
import AlertCollection from '../AlertCollection';

describe('TestCollection Component', () => {
  const props = {
    alerts: [
      {
        id: 'id-1',
        muted: true,
        name: 'my alert 1',
        metric: 'monthly_sending_limit',
        last_triggered: null,
        last_triggered_formatted: null,
        last_triggered_timestamp: 0
      },
      {
        id: 'id-2',
        muted: false,
        name: 'my alert 2',
        metric: 'monthly_sending_limit',
        last_triggered: '2019-06-05T14:48:00.000Z',
        last_triggered_formatted: 'Jun 5 2019, 10:48am',
        last_triggered_timestamp: 1559746080000
      },
      {
        id: 'id-3',
        muted: true,
        name: 'my alert 3',
        metric: 'health_score',
        last_triggered: '2019-06-015T14:48:00.000Z',
        last_triggered_formatted: 'Jun 15 2019, 10:48am',
        last_triggered_timestamp: 1560610080000
      }
    ],
    handleDelete: jest.fn()
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

  it('should handleDelete', () => {
    const Component = () => wrapper.instance().getRowData(props.alerts[0]).pop();
    const actionCol = shallow(<Component />);
    actionCol.find('Button').simulate('click');
    expect(props.handleDelete).toHaveBeenCalledWith({ id: 'id-1', name: 'my alert 1' });
  });
});
