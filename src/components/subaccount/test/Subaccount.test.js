import React from 'react';
import { shallow } from 'enzyme';
import Subaccount from '../Subaccount';

describe('Component: Subaccount', () => {

  it('should render a non-default assigned subaccount', () => {
    expect(shallow(<Subaccount id={12} />)).toMatchSnapshot();
    expect(shallow(<Subaccount id='13' />)).toMatchSnapshot();
  });

  it('should render a default assigned subaccount', () => {
    expect(shallow(<Subaccount id={12} isDefault />)).toMatchSnapshot();
  });

  it('should render a shared with all tag', () => {
    expect(shallow(<Subaccount all />)).toMatchSnapshot();
  });

  it('should render a master account tag', () => {
    expect(shallow(<Subaccount master />)).toMatchSnapshot();
  });
});
