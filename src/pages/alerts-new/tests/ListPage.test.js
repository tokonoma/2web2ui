import { shallow } from 'enzyme';
import React from 'react';
import { ListPage } from '../ListPage';

describe('Page: Alerts List', () => {
  const props = {
    listAlerts: jest.fn(),
    deleteAlert: jest.fn(() => Promise.resolve()),
    showAlert: jest.fn(),
    error: null,
    alerts: [
      {
        id: 'id-1',
        name: 'my alert 1'
      },
      {
        id: 'id-2',
        name: 'my alert 2'
      },
      {
        id: 'id-3',
        name: 'my alert 3'
      }
    ],
    loading: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ListPage {...props} />);
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
    wrapper.setState({ showDeleteModal: true });
    expect(wrapper.find('DeleteModal')).toMatchSnapshot();
  });

  it('should toggle delete modal', () => {
    expect(wrapper).toHaveState('showDeleteModal', false);
    expect(wrapper).toHaveState('alertToDelete', {});
    wrapper.instance().toggleDelete({ id: 'test-id', subaccount_id: 101, name: 'mock name' });
    expect(wrapper).toHaveState('showDeleteModal', true);
    expect(wrapper).toHaveState('alertToDelete', { id: 'test-id', subaccountId: 101, name: 'mock name' });
  });

  it('should handle delete', async () => {
    wrapper.setState({ 'alertToDelete': { id: 'alert-id', subaccountId: 202 }});
    await wrapper.instance().handleDelete();
    expect(props.deleteAlert).toHaveBeenCalledWith({ id: 'alert-id', subaccountId: 202 });
    expect(props.showAlert).toHaveBeenCalled();
  });
});
