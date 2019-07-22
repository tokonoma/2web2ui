import { shallow } from 'enzyme';
import React from 'react';
import { CreatePageNew } from '../CreatePageNew';
import format from '../helpers/formatFormData';
import AlertFormNew from '../components/AlertFormNew';

jest.mock('../helpers/formatFormData');

describe('Page: Alerts Create', () => {
  const props = {
    createAlert: jest.fn(() => Promise.resolve({ id: 'mock-id' })),
    showUIAlert: jest.fn(),
    error: null,
    history: {
      push: jest.fn()
    },
    loading: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreatePageNew {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    format.mockImplementationOnce((a) => a);
    await wrapper.find(AlertFormNew).simulate('submit', { value: 'mock value' });
    expect(props.createAlert).toHaveBeenCalledWith({ data: { value: 'mock value' }});
    expect(props.showUIAlert).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/alerts-new');
  });
});
