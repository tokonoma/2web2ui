import React from 'react';
import { shallow } from 'enzyme';
import NewCollectionBody from '../NewCollectionBody';

describe('NewCollectionBody', () => {
  const subject = (props = {}) => shallow(<NewCollectionBody {...props} />);

  it('renders table collection', () => {
    const props = {
      heading: 'Header',
      filterBox: '<FilterBox />',
      collection: '<Collection />',
      pagination: '<Pagination />',
    };
    expect(subject(props)).toMatchSnapshot();
  });
});
