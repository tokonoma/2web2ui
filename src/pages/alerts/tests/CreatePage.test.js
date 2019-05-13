import { shallow } from 'enzyme';
import React from 'react';
import { CreatePage } from '../CreatePage';
import format from '../helpers/formatActionData';

jest.mock('../helpers/formatActionData');

describe('Page: Alerts Create', () => {
  const props = {
    createAlert: jest.fn(() => Promise.resolve({ id: 'mock-id' })),
    showAlert: jest.fn(),
    error: null,
    history: {
      push: jest.fn()
    },
    loading: false
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreatePage {...props} />);
  });

  it('should render happy path', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    format.mockImplementationOnce((a) => a);
    await wrapper.find('withRouter(Connect(ReduxForm))').simulate('submit', { value: 'mock value' });
    expect(props.createAlert).toHaveBeenCalledWith({ data: { value: 'mock value' }});
    expect(props.showAlert).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/alerts/edit/mock-id');
  });
});
