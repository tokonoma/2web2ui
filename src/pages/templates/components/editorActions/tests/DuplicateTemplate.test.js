import React from 'react';
import { shallow } from 'enzyme';
import DuplicateTemplate from '../DuplicateTemplate';

describe('DuplicateTemplate', () => {
  it('invokes the function passed via the `onClick` prop', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<DuplicateTemplate onClick={mockFn}/>);

    wrapper.childAt(0).simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('Renders with the passed in `className`', () => {
    const wrapper = shallow(<DuplicateTemplate className="foobar"/>);

    expect(wrapper.find('.foobar')).toExist();
  });
});
