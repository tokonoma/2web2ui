import React from 'react';
import { shallow } from 'enzyme';
import NewCollectionBody from '../NewCollectionBody';

describe('NewCollectionBody', () => {
  const subject = (props = {}) =>
    shallow(<NewCollectionBody {...props} collection="My Collection" heading="My Header" />);

  it('renders a table collection', () => {
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('My Header');
    expect(wrapper).toHaveTextContent('My Collection');
  });

  it('renders a table collection with a filterBox', () => {
    const wrapper = subject({ filterBox: 'My Filterbox' });
    expect(wrapper).toHaveTextContent('My Filterbox');
  });

  it('renders a table collection with pagination', () => {
    const wrapper = subject({ pagination: 'My Pagination' });
    expect(wrapper).toHaveTextContent('My Pagination');
  });
});
