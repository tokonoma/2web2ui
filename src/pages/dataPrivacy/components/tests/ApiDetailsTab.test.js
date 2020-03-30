import React from 'react';
import { shallow } from 'enzyme';
import ApiDetailsTab from '../ApiDetailsTab';

describe('ApiDetailsTab', () => {
  const subject = () => shallow(<ApiDetailsTab />);

  it('renders Generate Key Button', () => {
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('Generate key');
  });

  it('renders a link to api documentation for data privacy', () => {
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('Link to documentation');
  });
});
