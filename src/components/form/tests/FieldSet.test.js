import React from 'react';
import { shallow } from 'enzyme';
import FieldSet from '../FieldSet';

describe('FieldSet', () => {
  const subject = () =>
    shallow(
      <FieldSet legend="Examples">
        <input name="example_a" type="text" />
        <input name="example_b" type="text" />
      </FieldSet>,
    );

  it('renders fieldset with legend', () => {
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('fieldset');
    expect(wrapper).toHaveTextContent('Examples');
  });
});
