import { shallow } from 'enzyme';
import React from 'react';
import { CreatePageNew } from '../CreatePageNew';
import { formatFormValues } from '../helpers/formatFormValues';
import AlertFormNew from '../components/AlertFormNew';

jest.mock('../helpers/formatFormValues');

describe('Page: Alerts Create', () => {
  const props = {
    createAlert: jest.fn(() => Promise.resolve({ id: 'mock-id' })),
    showUIAlert: jest.fn(),
    error: null,
    history: {
      push: jest.fn()
    },
    loading: false,
    getAlert: jest.fn(),
    getError: undefined,
    getLoading: undefined,
    idToDuplicate: undefined,
    alert: {}
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreatePageNew {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Loading when loading duplicate alert', () => {
    wrapper.setProps({ getLoading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('should render Error when there is an error during duplicate alert', () => {
    wrapper.setProps({ getError: true });
    expect(wrapper.find('RedirectAndAlert')).toExist();
  });

  it('should get alert if duplicate id exists', () => {
    const newProps = { idToDuplicate: 'alert-id-1' };
    wrapper = shallow(<CreatePageNew {...props} {...newProps} />);
    expect(props.getAlert).toHaveBeenCalledWith({ id: 'alert-id-1' });
  });

  it('should handle submit', async () => {
    formatFormValues.mockImplementationOnce((a) => a);
    await wrapper.find(AlertFormNew).simulate('submit', { value: 'mock value' });
    expect(props.createAlert).toHaveBeenCalledWith({ data: { value: 'mock value' }});
    expect(props.showUIAlert).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/alerts-new');
  });
});
