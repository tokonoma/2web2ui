import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import UnstyledLink from '../UnstyledLink';

jest.mock('src/context/HibanaContext');

describe('UnstyledLink Matchbox component wrapper', () => {
  const subject = props =>
    shallow(
      <UnstyledLink to="/test" {...props}>
        Children...
      </UnstyledLink>,
    );

  it('renders the Hibana version of the UnstyledLink component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaUnstyledLink');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('UnstyledLink');
  });
});
