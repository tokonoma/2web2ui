import { shallow } from 'enzyme';
import React from 'react';
import { OGLegend } from '../Legend';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Legend Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      items: [
        { fill: 'blue', label: 'label 1' },
        { label: 'label 2' },
        { label: 'label 2', fill: 'white', hasBorder: true },
      ],
    };
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    wrapper = shallow(<OGLegend {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('Item').forEach(item => {
      expect(item.dive()).toMatchSnapshot();
    });
  });

  it('renders correctly with tooltip content', () => {
    wrapper.setProps({ tooltipContent: label => label });
    wrapper.find('OGItem').forEach(item => {
      expect(item.dive().find('Tooltip')).toExist();
    });
  });
});
