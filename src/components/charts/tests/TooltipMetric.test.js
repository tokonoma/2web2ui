import { shallow } from 'enzyme';
import React from 'react';
import { OGTooltipMetric } from '../TooltipMetric';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Signals TooltipMetric Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      label: 'Foo',
      value: 101,
    };
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    wrapper = shallow(<OGTooltipMetric {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with color', () => {
    wrapper.setProps({ color: '#abc' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with description', () => {
    wrapper.setProps({ description: 'lorem ipsum dolor' });
    expect(wrapper).toMatchSnapshot();
  });
});
