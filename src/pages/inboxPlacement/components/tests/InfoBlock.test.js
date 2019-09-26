import React from 'react';
import { shallow } from 'enzyme';

import InfoBlock from '../InfoBlock';

describe('Component: InfoBlock', () => {
  const subject = ({ ...props }) => shallow(<InfoBlock{...props}/>);

  it('renders correctly', () => {
    expect(subject({ label: 'Foo', value: 'bar' })).toMatchSnapshot();
  });

  it('renders correctly with grid override', () => {
    expect(subject({ columnProps: { md: 5 }}).prop('md')).toEqual(5);
  });

});
