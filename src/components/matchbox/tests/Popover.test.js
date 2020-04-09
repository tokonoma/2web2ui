import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Popover from '../Popover';

jest.mock('src/context/HibanaContext');

describe('Popover Matchbox component wrapper', () => {
  const subject = props =>
    shallow(
      <Popover
        id="test-popover"
        trigger={<button aria-controls="test-popover">Click</button>}
        {...props}
      >
        Hi
      </Popover>,
    );

  it('renders OG Popover when disabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('Popover');
  });

  it('renders Hibana Popover when enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaPopover');
  });
});
