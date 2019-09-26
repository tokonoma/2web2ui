import React from 'react';
import { shallow } from 'enzyme';
import { SingleResult } from '../SingleResult';
import { RESULT_DESCRIPTIONS } from '../constants';

describe('SingleResult', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      singleResults: {
        result: 'valid',
        valid: true,
        reason: 'Invalid Domain',
        is_role: false,
        is_disposable: false,
        is_free: false,
        did_you_mean: 'harry.potter@hogwarts.edu',
        email: 'harry.potter@hogwarts.com'
      },
      singleAddress: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      history: {
        push: jest.fn()
      }
    };

    wrapper = shallow(<SingleResult {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly if missing certain fields', () => {
    wrapper.setProps({ singleResults: { valid: true, is_role: false, is_disposable: false, is_free: true }});
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect and show alert fails to validate', async () => {
    props.singleAddress = jest.fn(() => Promise.reject({ message: 'error message' }));
    wrapper = shallow(<SingleResult {...props}/>);
    await wrapper;

    expect(props.showAlert).toHaveBeenCalledWith({ message: 'error message', type: 'error' });
    expect(props.history.push).toHaveBeenCalledWith('/recipient-validation/single');
  });

  it('should render loading state', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('renders correctly when valid', () => {
    expect(wrapper.find('SuccessIcon')).toExist();
    expect(wrapper.find('p[name="result-description"]')).toHaveProp('children', RESULT_DESCRIPTIONS.valid);
  });

  it('renders correctly when risky', () => {
    wrapper.setProps({ singleResults: { ...props.singleResults, result: 'risky' }});
    expect(wrapper.find('WarningIcon')).toExist();
    expect(wrapper.find('p[name="result-description"]')).toHaveProp('children', RESULT_DESCRIPTIONS.risky);
  });

  it('renders correctly when undeliverable', () => {
    wrapper.setProps({ singleResults: { ...props.singleResults, result: 'undeliverable' }});
    expect(wrapper.find('ErrorIcon')).toExist();
    expect(wrapper.find('p[name="result-description"]')).toHaveProp('children', RESULT_DESCRIPTIONS.undeliverable);
  });
});
