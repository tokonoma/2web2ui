
import React from 'react';
import { mount } from 'enzyme';
import { Container } from '../withJobs';

describe('withJobs', () => {
  const subject = (props = {}) => mount(
    <Container component="div" getList={() => {}} jobs={[]} {...props} />
  );

  it('renders wrapped component', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });

  it('calls get list action on mount', () => {
    const getList = jest.fn();
    subject({ getList });
    expect(getList).toHaveBeenCalled();
  });
});
