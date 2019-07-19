import React from 'react';
import { shallow } from 'enzyme';
import { UIOptionsPanel } from '../UIOptionsPanel';

let props;
let wrapper;

describe('UIOptionsPanel', () => {
  beforeEach(() => {
    props = {
      hideTermSubEnabled: false,
      updateAccount: jest.fn()
    };
    wrapper = shallow(<UIOptionsPanel {...props} />);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders toggle correctly if option enabled', () => {
    props.hideTermSubEnabled = true;
    wrapper = shallow(<UIOptionsPanel {...props} />);
    expect(wrapper.find('Toggle').prop('checked')).toEqual(true);
  });

  it('shoudld toggle', () => {
    wrapper.find('Toggle').simulate('change');
    expect(props.updateAccount).toHaveBeenCalledWith({ options: { ui: { hideTerminatedSubaccounts: true }}});
  });
});
