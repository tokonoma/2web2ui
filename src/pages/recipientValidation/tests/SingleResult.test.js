import React from 'react';
import { shallow } from 'enzyme';
import { SingleResult } from '../SingleResult';

describe('SingleResult', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      singleResults: {
        result: 'deliverable',
        valid: true,
        reason: 'Invalid Domain',
        is_role: false,
        is_disposable: false,
        is_free: false,
        did_you_mean: 'harry.potter@hogwarts.edu',
        email: 'harry.potter@hogwarts.com'
      },
      singleAddress: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn()
    };

    wrapper = shallow(<SingleResult {...props} />);
  });

  it('should redirect if no results', () => {
    wrapper.setProps({ singleResults: null });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading state', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('renders correctly when valid', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when risky', () => {
    wrapper.setProps({ singleResults: { ...props.singleResults, result: 'risky' }});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when undeliverable', () => {
    wrapper.setProps({ singleResults: { ...props.singleResults, result: 'undeliverable' }});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when result is unknown', () => {
    wrapper.setProps({ singleResults: { ...props.singleResults, result: 'unknown' }});
    expect(wrapper).toMatchSnapshot();
  });
});
