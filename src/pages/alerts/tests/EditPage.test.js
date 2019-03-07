import { shallow } from 'enzyme';
import React from 'react';
import { EditPage } from '../EditPage';

describe('Page: Alerts Edit', () => {
  const props = {
    getAlert: jest.fn(),
    updateAlert: jest.fn(),
    deleteAlert: jest.fn(() => Promise.resolve()),
    showAlert: jest.fn(),
    error: null,
    history: [],
    id: 'id-1',
    alert: {
      id: 'alert-id',
      name: 'shortName',
      email_addresses: 'foo@bar.com',
      alert_metric: 'signals_health_threshold',
      threshold: {
        error: {
          comparator: 'gt',
          target: 20
        }
      },
      assignTo: 'subaccount',
      subaccount: jest.fn()
    },
    loading: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditPage {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading component when loading data', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toHaveLength(1);
  });

  it('should render delete modal', () => {
    wrapper.setState({ showDeleteModal: true });
    expect(wrapper.find('DeleteModal')).toMatchSnapshot();
  });

  it('should toggle delete modal', () => {
    expect(wrapper).toHaveState('showDeleteModal', false);
    wrapper.instance().toggleDelete();
    expect(wrapper).toHaveState('showDeleteModal', true);
  });

  it('should handle delete', async () => {
    await wrapper.instance().handleDelete();
    expect(props.deleteAlert).toHaveBeenCalledWith({ id: 'alert-id' });
    expect(props.showAlert).toHaveBeenCalled();
    expect(props.history[0]).toEqual('/alerts');
  });
});
