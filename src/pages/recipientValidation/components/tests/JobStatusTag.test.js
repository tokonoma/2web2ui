import React from 'react';
import { shallow } from 'enzyme';
import JobStatusTag from '../JobStatusTag';

describe('JobStatusTag', () => {
  const subject = (props = {}) => shallow(<JobStatusTag {...props} />);

  it('renders a loading tag', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders an error tag', () => {
    expect(subject({ status: 'error' })).toMatchSnapshot();
  });

  it('renders a ready tag', () => {
    expect(subject({ status: 'queued_for_batch' })).toMatchSnapshot();
  });

  it('renders a success tag', () => {
    expect(subject({ status: 'success' })).toMatchSnapshot();
  });
});
