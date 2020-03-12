import React from 'react';
import Panel from '../Panel';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Panel Matchbox component wrapper', () => {
  const defaultProps = {
    accent: true,
  };
  const systemProps = {
    my: '100',
  };
  const mergedProps = { ...systemProps, ...defaultProps };
  const subject = () => {
    return shallow(<Panel {...mergedProps}>Children...</Panel>);
  };

  it('renders the Hibana Panel component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();
    expect(wrapper.find('HibanaPanel')).toExist();
    expect(wrapper.find('OGPanel')).not.toExist();

    Object.keys(mergedProps).forEach(key => {
      expect(wrapper.find('HibanaPanel')).toHaveProp(key, mergedProps[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  });

  it('renders the OG Panel component correctly when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();
    expect(wrapper.find('OGPanel')).toExist();
    expect(wrapper.find('HibanaPanel')).not.toExist();
    Object.keys(defaultProps).forEach(key => {
      expect(wrapper.find('OGPanel')).toHaveProp(key, mergedProps[key]);
    });
    Object.keys(systemProps).forEach(key => {
      expect(wrapper.find('OGPanel')).not.toHaveProp(key, mergedProps[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  });
});
