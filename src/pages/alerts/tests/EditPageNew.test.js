import { shallow } from 'enzyme';
import React from 'react';
import { EditPageNew } from '../EditPageNew';
import { formatFromFormToApi } from '../helpers/formatFormData';
import AlertFormNew from '../components/AlertFormNew';

jest.mock('../helpers/formatFormData');

describe('Page: Alerts Edit', () => {
  const props = {
    updateAlert: jest.fn(() => Promise.resolve({ id: 'mock-id' })),
    showUIAlert: jest.fn(),
    error: null,
    history: {
      push: jest.fn()
    },
    loading: false,
    getAlert: jest.fn(),
    getError: undefined,
    getLoading: undefined,
    id: 'alert-id-1',
    alert: {}
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditPageNew {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Loading when loading alert', () => {
    wrapper.setProps({ getLoading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('should render Error when there is an error when getting alert', () => {
    wrapper.setProps({ getError: true });
    expect(wrapper.find('RedirectAndAlert')).toExist();
  });

  it('should get alert when component mounts', () => {
    wrapper = shallow(<EditPageNew {...props} id={'alert-id-2'} />);
    expect(props.getAlert).toHaveBeenCalledWith({ id: 'alert-id-2' });
  });

  it('should handle submit', async () => {
    formatFromFormToApi.mockImplementationOnce((a) => a);
    await wrapper.find(AlertFormNew).simulate('submit', { value: 'mock value' });
    expect(props.updateAlert).toHaveBeenCalledWith({ data: { value: 'mock value' }, id: props.id });
    expect(props.showUIAlert).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/alerts-new');
  });
});
