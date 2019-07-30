import React from 'react';
import { shallow } from 'enzyme';
import { UIOptionsPanel } from '../UIOptionsPanel';

const subject = (props = {}) => shallow(
  <UIOptionsPanel
    hideTermSubEnabled={false}
    setAccountOption={() => {}}
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
    const setAccountOption = jest.fn();
    const wrapper = subject({ setAccountOption });
    wrapper.find('Toggle').simulate('change');
    expect(setAccountOption).toHaveBeenCalledWith('hideTerminatedSubaccounts', true);
  });
});
