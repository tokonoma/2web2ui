import React from 'react';
import { shallow } from 'enzyme';
import { ConsentBar } from '../ConsentBar';

jest.mock('src/context/HibanaContext');

describe('ConsentBar', () => {
  const subject = props => {
    const defaults = { onDismiss: jest.fn() };

    return shallow(<ConsentBar {...defaults} {...props} />);
  };

  it('should render correctly', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });
});
