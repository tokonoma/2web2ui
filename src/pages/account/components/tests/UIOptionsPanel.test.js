import React from 'react';
import { shallow } from 'enzyme';
import { UIOptionsPanel } from '../UIOptionsPanel';

const subject = (props = {}) => shallow(
  <UIOptionsPanel
    hideTermSubEnabled={false}
    updateAccount={() => {}}
    {...props}
  />
);

describe('UIOptionsPanel', () => {
  it('renders', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders toggle correctly if option enabled', () => {
    const wrapper = subject({ hideTermSubEnabled: true });
    expect(wrapper.find('Toggle')).toHaveProp('checked', true);
  });

  it('shoudld toggle', () => {
    const updateAccount = jest.fn();
    const wrapper = subject({ updateAccount });
    wrapper.find('Toggle').simulate('change');
    expect(updateAccount).toHaveBeenCalledWith({ options: { ui: { hideTerminatedSubaccounts: true }}});
  });
});
