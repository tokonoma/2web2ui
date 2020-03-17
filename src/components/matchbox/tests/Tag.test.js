import React from 'react';
import { shallow } from 'enzyme';
import Tag from '../Tag';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Tag Matchbox component wrapper', () => {
  const defaultProps = {
    onRemove: () => jest.fn(),
  };
  const systemProps = {
    my: '100',
  };
  const mergedProps = { ...systemProps, ...defaultProps };
  const subject = () => {
    return shallow(<Tag {...mergedProps}>Children...</Tag>);
  };
  it('renders the HibanaTag component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper.find('HibanaTag')).toExist();
    expect(wrapper.find('OGTag')).not.toExist();
    Object.keys(mergedProps).forEach(key => {
      expect(wrapper.find('HibanaTag')).toHaveProp(key, mergedProps[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  });
  it('renders the OGTag component correctly when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper.find('OGTag')).toExist();
    expect(wrapper.find('HibanaTag')).not.toExist();
    Object.keys(defaultProps).forEach(key => {
      expect(wrapper.find('OGTag')).toHaveProp(key, mergedProps[key]);
    });
    Object.keys(systemProps).forEach(key => {
      expect(wrapper.find('OGTag')).not.toHaveProp(key, mergedProps[key]);
    });
    expect(wrapper).toHaveTextContent('Children...');
  });
});
