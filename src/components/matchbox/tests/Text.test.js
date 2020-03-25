import React from 'react';
import Text from '../Text';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Text matchbox component wrapper', () => {
  const props = { as: 'p' };
  const subject = () => shallow(<Text {...props}>Children...</Text>);

  it('renders Hibana component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper.find('HibanaText')).toExist();
    Object.keys(props).forEach(key => {
      expect(wrapper.find('HibanaText')).toHaveProp(key, props[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  });

  it('ignores Hibana component and just renders the child components when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper.find('HibanaText')).not.toExist();
    expect(wrapper).toHaveTextContent('Children...');
  });
});
