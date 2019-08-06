import React from 'react';
import { shallow } from 'enzyme';
import CopyToClipboard from '../CopyToClipboard';

jest.mock('copy-to-clipboard');

describe('CopyToClipboard Component', () => {
  window.setTimeout = jest.fn();
  window.clearTimeout = jest.fn();

  const subject = ({ ...props }) => shallow(<CopyToClipboard {...props} />);

  it('renders with default props', () => {
    const wrapper = subject();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.instance().timeout).toEqual(null);
  });

  it('renders with provided label', () => {
    expect(subject().find('Button')).toMatchSnapshot();
  });

  it('should handle copy click', () => {
    const wrapper = subject();
    wrapper.setProps({ value: 'to copy' });
    wrapper.instance().handleCopy();
    wrapper.update();
    expect(wrapper).toHaveState('copied', true);
    expect(wrapper.find('Tooltip').prop('content')).toEqual('Copied to Clipboard');
    expect(window.clearTimeout).toHaveBeenCalled();
    expect(wrapper.instance().timeout).not.toEqual(null);
  });

});
