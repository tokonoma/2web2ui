import React from 'react';
import { shallow } from 'enzyme';
import ExternalLink from '../ExternalLink';

describe('ExternalLink', () => {
  const subject = props =>
    shallow(
      <ExternalLink to="http://example.com" {...props}>
        See ya!
      </ExternalLink>,
    );

  it('renders link copy', () => {
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('See ya!');
  });

  it('ignores component composition', () => {
    expect(subject({ component: 'button' })).not.toHaveProp('component');
  });

  it('ignores click event handler', () => {
    expect(subject({ onClick: () => {} })).not.toHaveProp('onClick');
  });
});
