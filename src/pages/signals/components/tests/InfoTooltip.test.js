import { shallow } from 'enzyme';
import React from 'react';
import InfoTooltip from '../InfoTooltip';

describe('Signals InfoTooltip Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      content: 'Foo'
    };
    wrapper = shallow(<InfoTooltip {...props}/>);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with size correctly', () => {
    wrapper.setProps({ size: 15 });
    expect(wrapper.find('InfoOutline').prop('size')).toEqual(15);
  });
});
