import React from 'react';
import { shallow } from 'enzyme';
import { DivergingBarClassComponent as DivergingBar } from '../DivergingBar';
import styles from '../DivergingBar.module.scss';

describe('DivergingBar Component', () => {
  let wrapper;
  let props;
  const data = [
    { label: 'Label foo', value: '0.5' },
    { label: 'Label bar', value: '-0.5' },
  ];
  const getPayload = i => ({
    key: data[i].key,
    background: { x: 0, width: 100 },
    payload: { ...data[i], value: data[i].label },
  });

  beforeEach(() => {
    props = {
      barHeight: 10,
      data,
      xKey: 'value',
      yKey: 'label',
      width: '50%',
      onClick: jest.fn(),
      tooltipContent: jest.fn(),
      styles,
    };
    wrapper = shallow(<DivergingBar {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle click on Bar', () => {
    wrapper.find('Bar').simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });

  it('should render custom unselected bar', () => {
    const Bar = wrapper
      .find('Bar')
      .at(0)
      .props()
      .shape(getPayload(0));
    expect(Bar).toMatchSnapshot();
  });

  it('should render selected bar', () => {
    wrapper.setProps({ selected: data[0].label });
    const Bar = wrapper
      .find('Bar')
      .props()
      .shape(getPayload(0));
    expect(Bar).toMatchSnapshot();
  });

  it('should render custom unselected y tick', () => {
    const Text = wrapper
      .find('YAxis')
      .props()
      .tick(getPayload(0));
    expect(Text).toMatchSnapshot();
  });
});
