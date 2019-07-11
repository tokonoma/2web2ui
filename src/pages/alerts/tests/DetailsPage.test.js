import { shallow } from 'enzyme';
import React from 'react';
import { DetailsPage } from '../DetailsPage';

describe('Page: Alert Details', () => {
  const props = {
    getAlert: jest.fn(),
    deleteAlert: jest.fn(() => Promise.resolve()),
    showUIAlert: jest.fn(),
    hasSubaccounts: true,
    listSubaccounts: jest.fn(() => Promise.resolve()),
    subaccounts: [{ id: 1, name: 'My Subacount' }],
    alert: { name: 'My Alert' },
    loading: false,
    id: 'alert-id',
    deletePending: false,
    history: { push: jest.fn() }
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DetailsPage {...props} />);
  });

  it('should render Alert Details Page', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading component when loading data', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toHaveLength(1);
    expect(wrapper.find('Page')).not.toExist();
  });

  it('should redirect to List page if fails to load', () => {
    wrapper.setProps({ error: { message: 'this failed' }});
    expect(wrapper.find('RedirectAndAlert')).toHaveLength(1);
    expect(wrapper.find('Page')).not.toExist();
  });

  it('should toggle delete modal upon clicking delete Button', () => {
    expect(wrapper).toHaveState('isDeleteModalOpen', false);
    wrapper.find('Page').dive().find('Button').at(1).simulate('click');
    expect(wrapper.find('DeleteModal').prop('open')).toEqual(true);
  });

  it('should handle delete', async () => {
    await wrapper.instance().handleDelete();
    expect(props.deleteAlert).toHaveBeenCalledWith({ id: 'alert-id' });
    expect(props.showUIAlert).toHaveBeenCalled();
  });
});
