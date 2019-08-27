import React from 'react';
import { shallow } from 'enzyme';
import JobFileName from '../JobFileName';

describe('JobFileName', () => {
  const subject = (props = {}) => shallow(<JobFileName {...props}/>);

  it('renders the empty state when no value for the `filename` prop is provided', () => {
    expect(subject().text()).toEqual('File name not available');
  });

  it('renders the filename when a value is passed via the `filename` prop', () => {
    const wrapper = subject({ filename: 'foobar' });

    expect(wrapper.text()).toEqual('foobar');
  });
});
