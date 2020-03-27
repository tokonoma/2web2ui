import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'src/components/matchbox';
import ExternalLink from '../ExternalLink';

describe('ExternalLink', () => {
  const subject = props =>
    shallow(
      <ExternalLink to="http://example.com" {...props}>
        See ya!
      </ExternalLink>,
    );

  it('renders an external link', () => {
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('UnstyledLink');
    expect(wrapper).toHaveProp({
      to: 'http://example.com',
      external: true,
    });
    expect(wrapper).toHaveTextContent('See ya!');
  });

  it('ignores component composition', () => {
    expect(subject({ component: 'button' })).not.toHaveProp('component');
  });

  it('ignores click event handler', () => {
    expect(subject({ onClick: () => {} })).not.toHaveProp('onClick');
  });

  it('renders a button', () => {
    const wrapper = subject({ as: Button });
    expect(wrapper).toHaveDisplayName('Button');
  });
});
