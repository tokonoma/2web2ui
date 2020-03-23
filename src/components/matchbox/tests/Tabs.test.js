import React from 'react';
import { shallow } from 'enzyme';
import Tabs from '../Tabs';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Tabs Matchbox component wrapper', () => {
  const defaultProps = {
    selected: 1,
  };
  const systemProps = {
    my: '100',
  };
  const mergedProps = { ...systemProps, ...defaultProps };
  const subject = () => {
    return shallow(<Tabs {...mergedProps}></Tabs>);
  };
  it('renders the HibanaTabs component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper.find('HibanaTabs')).toExist();
    expect(wrapper.find('OGTabs')).not.toExist();
    Object.keys(mergedProps).forEach(key => {
      expect(wrapper.find('HibanaTabs')).toHaveProp(key, mergedProps[key]);
    });
  });
  it('renders the OGTabs component correctly when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper.find('OGTabs')).toExist();
    expect(wrapper.find('HibanaTabs')).not.toExist();
    Object.keys(defaultProps).forEach(key => {
      expect(wrapper.find('OGTabs')).toHaveProp(key, mergedProps[key]);
    });
    Object.keys(systemProps).forEach(key => {
      expect(wrapper.find('OGTabs')).not.toHaveProp(key, mergedProps[key]);
    });
  });
});
