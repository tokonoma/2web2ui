import React from 'react';
import Stack from '../Stack';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Stack matchbox component wrapper', () => {
  const props = { space: '200' };
  const subject = () => shallow(<Stack {...props}>Children...</Stack>);

  it('renders Hibana component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper.find('HibanaStack')).toExist();
    Object.keys(props).forEach(key => {
      expect(wrapper.find('HibanaStack')).toHaveProp(key, props[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  });

  it('ignores Hibana component and just renders the child components when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper.find('HibanaStack')).not.toExist();
    expect(wrapper).toHaveTextContent('Children...');
  });
});
