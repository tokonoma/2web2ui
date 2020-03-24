import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import PageLink from '../PageLink';

describe('PageLink', () => {
  const subject = () => shallow(<PageLink to="/dashboard">Dashboard</PageLink>);

  it('renders a link', () => {
    expect(subject()).toHaveTextContent('Dashboard');
  });

  it('wired to router', () => {
    expect(subject()).toHaveProp('component', Link);
  });
});
