import React from 'react';
import { shallow } from 'enzyme';
import { ConsentBar } from '../ConsentBar';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');

describe('ConsentBar', () => {
  const subject = props => {
    const defaults = { onDismiss: jest.fn() };

    return shallow(<ConsentBar {...defaults} {...props} />);
  };

  it('should render correctly', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly in hibana', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
  });
});
