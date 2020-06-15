import React from 'react';
import Select from '../Select';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');

describe('Select Matchbox component wrapper', () => {
  const defaultProps = {
    icon: '',
    title: 'Select Component',
    id: 'Select',
    subtitle: 'click to expand',
    options: [],
  };

  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = shallow(<Select {...defaultProps} />);

    expect(wrapper.find('Box')).toExist();
    expect(wrapper.find('HibanaSelect')).toExist();
  });

  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibnaEnabled: false }]);
    const wrapper = shallow(<Select {...defaultProps} />);

    expect(wrapper.find('Select')).toExist();
  });
});
