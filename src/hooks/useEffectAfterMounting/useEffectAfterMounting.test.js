import React from 'react';
import { mount } from 'enzyme';
import useEffectAfterMounting from '../useEffectAfterMounting';

describe('useEffectAfterMounting', () => {
  const MockComponent = props => {
    useEffectAfterMounting(() => {
      props.callback();
    }, [props.callback]);
    return null;
  };

  const subject = (callback, cleanup = () => {}) =>
    mount(<MockComponent callback={callback} cleanup={cleanup} />);

  it('does not call callback on mount', () => {
    const callback = jest.fn();
    subject(callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('calls callback on prop update', () => {
    const wrapper = subject(jest.fn());
    const newCallback = jest.fn();
    wrapper.setProps({ callback: newCallback });
    expect(newCallback).toHaveBeenCalled();
  });
});
