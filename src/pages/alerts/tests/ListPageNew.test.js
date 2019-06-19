import { shallow } from 'enzyme';
import React from 'react';
import { ListPageNew } from '../ListPageNew';

describe('Page: Alerts List', () => {
  const props = {
    listAlerts: jest.fn(),
    deleteAlert: jest.fn(() => Promise.resolve()),
    showAlert: jest.fn(),
    error: null,
    alerts: [
      {
        id: 'id-1',
        name: 'my alert 1',
        metric: 'health_score',
        last_triggered: '2019-06-15T14:48:00.000Z'
      },
      {
        id: 'id-2',
        name: 'my alert 2',
        metric: 'health_score',
        last_triggered: null
      },
      {
        id: 'id-3',
        name: 'my alert 3',
        metric: 'monthly_sending_limit',
        last_triggered: '2019-06-05T05:48:00.000Z'
      }
    ],
    loading: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ListPageNew {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading component when loading data', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toHaveLength(1);
  });

  it('should render error when list fails to load', () => {
    wrapper.setProps({ error: { message: 'this failed' }});
    expect(wrapper.find('ApiErrorBanner')).toMatchSnapshot();
  });

  it('should render delete modal', () => {
    wrapper.setState({ alertToDelete: { id: 1, name: 'foo' }});
    expect(wrapper.find('DeleteModal')).toMatchSnapshot();
  });

  it('should render last triggered cards correctly in order', () => {
    const { alerts } = props;
    const panel = wrapper.find('Panel');
    expect(panel).toHaveLength(2);
    expect(panel.first().find('h3').prop('children')).toEqual(alerts[0].name);
    expect(panel.last().find('h3').prop('children')).toEqual(alerts[2].name);
  });

  it('should render a maximum of 4 panels', () => {
    const alertsLong = [ ...props.alerts,
      { id: 4, last_triggered: '2019-06-05T05:48:00.000Z' },
      { id: 5, last_triggered: '2019-06-05T05:48:00.000Z' },
      { id: 6, last_triggered: '2019-06-05T05:48:00.000Z' }];
    wrapper.setProps({ alerts: alertsLong });
    expect(wrapper.find('Panel')).toHaveLength(4);
  });

  it('should toggle delete modal', () => {
    expect(wrapper).toHaveState('alertToDelete', {});
    wrapper.instance().openDeleteModal({ id: 'test-id', name: 'mock name' });
    expect(wrapper).toHaveState('alertToDelete', { id: 'test-id', name: 'mock name' });
    expect(wrapper.find('DeleteModal').prop('open')).toEqual(true);
  });

  it('should handle delete', async () => {
    wrapper.setState({ 'alertToDelete': { id: 'alert-id' }});
    await wrapper.instance().handleDelete();
    expect(props.deleteAlert).toHaveBeenCalledWith({ id: 'alert-id' });
    expect(props.showAlert).toHaveBeenCalled();
  });
});
