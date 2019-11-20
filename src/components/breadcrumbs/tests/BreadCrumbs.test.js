import React from 'react';
import { shallow } from 'enzyme';
import { BreadCrumbs, BreadCrumbsItem } from '../BreadCrumbs';

describe('BreadCrumbs', () => {

  const defaultProps = {
    children: [
      <BreadCrumbsItem onClick={jest.fn()} active={false}>A</BreadCrumbsItem>,
      <BreadCrumbsItem onClick={jest.fn()} active={false}>B</BreadCrumbsItem>,
      <BreadCrumbsItem onClick={jest.fn()} active={false}>C</BreadCrumbsItem>
    ]
  };

  const subject = (props) => (shallow(<BreadCrumbs {...defaultProps} {...props}/>));

  it('should not render > after the last breadCrumb ' , () => {
    const instance = subject();
    expect(instance.find('div').at(0).children().last()).not.toBe('>');
  });
});
