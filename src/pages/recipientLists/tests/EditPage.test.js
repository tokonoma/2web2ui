import React from 'react';
import { shallow } from 'enzyme';

import { EditPage } from '../EditPage';

describe('EditPage', () => {
  let props;
  let id;
  let wrapper;

  beforeEach(() => {
    id = 'fave-recipients';
    props = {
      change: jest.fn(),
      handleSubmit: jest.fn(),
      match: { params: { id }},
      list: [{
        id,
        name: 'Favorites',
        description: 'The creme de la creme',
        num_accepted_recipients: 23
      }],
      loading: false,
      current: {
        id,
        name: 'Favorites',
        description: 'The creme de la creme',
        num_accepted_recipients: 23
      },
      updateRecipientList: jest.fn(() => Promise.resolve()),
      deleteRecipientList: jest.fn(() => Promise.resolve()),
      getRecipientList: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      history: {
        push: jest.fn()
      }
    };
    wrapper = shallow(<EditPage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should load a recipient list', () => {
    wrapper.setProps({ current: null, loading: true });
    expect(props.getRecipientList).toHaveBeenCalled();
  });

  it('should handle a missing list id', async () => {
    props.getRecipientList.mockImplementationOnce(() => Promise.reject());
    wrapper.setProps({ current: null, loading: true });
    await wrapper.instance().componentDidMount();
    expect(props.history.push).toHaveBeenCalledWith('/lists/recipient-lists');
  });

  it('should show a delete modal', () => {
    wrapper.instance().toggleDelete();
    wrapper.update();
    expect(wrapper.find('DeleteModal')).toMatchSnapshot();
  });

  it('should delete a recipient list', async () => {
    await wrapper.instance().deleteRecipientList();
    expect(props.deleteRecipientList).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect after delete', async () => {
    await wrapper.instance().deleteRecipientList();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should update a recipient list', async () => {
    await wrapper.instance().updateRecipientList();
    expect(props.updateRecipientList).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect after update', async () => {
    await wrapper.instance().updateRecipientList();
    expect(props.history.push).toHaveBeenCalled();
  });
});
