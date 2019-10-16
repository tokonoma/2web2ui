import React from 'react';
import { shallow } from 'enzyme';
import DeleteTemplate from '../DeleteTemplate';

describe('DeleteTemplate', () => {
  it('renders delete button with a passed in className and onClick function', () => {
    const mockFn = jest.fn();

    const wrapper = shallow(<DeleteTemplate className="foo" onClick={mockFn}/>);

    expect(wrapper).toHaveProp('className', 'foo');

    wrapper.find('UnstyledLink').simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
