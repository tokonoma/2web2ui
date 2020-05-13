import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Legend from '../Legend';

jest.mock('src/context/HibanaContext');
jest.mock('src/hooks/useHibanaOverride', () => styles => styles);

describe('Legend Component', () => {
  const defaultProps = {
    items: [{ fill: 'blue', label: 'label 1' }, { label: 'label 2' }],
    OGFill: 'whitesmoke',
    hibanaFill: 'blue',
  };

  const subject = props => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    return shallow(<Legend {...defaultProps} {...props} />);
  };

  it('renders correctly', () => {
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
    wrapper.find('Item').forEach(item => {
      expect(item).toMatchSnapshot();
    });
  });

  it('renders correctly with tooltip content', () => {
    const wrapper = subject({ tooltipContent: label => label });
    expect(wrapper).toMatchSnapshot();
    wrapper.find('Item').forEach(item => {
      expect(item).toMatchSnapshot();
    });
  });
});
