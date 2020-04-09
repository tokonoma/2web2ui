import React from 'react';
import { shallow } from 'enzyme';
import ActionPopover from '../ActionPopover';

jest.mock('src/hooks/useUniqueId/useUniqueId');

describe('ActionPopover Component', () => {
  const subject = props => shallow(<ActionPopover id="test-popover" {...props} />);

  it('should render with no props', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should render with actions', () => {
    const actions = [
      { content: 'Edit', to: '/some/link' },
      { content: 'Delete', onClick: jest.fn() },
    ];
    const wrapper = subject({ actions });
    expect(wrapper).toMatchSnapshot();
  });
});
