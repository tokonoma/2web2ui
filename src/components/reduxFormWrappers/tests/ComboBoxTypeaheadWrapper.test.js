import React from 'react';
import { shallow } from 'enzyme';
import ComboBoxTypeaheadWrapper from '../ComboBoxTypeaheadWrapper';

describe('ComboBoxTypeaheadWrapper', () => {

  const props = {
    input: {
      name: 'example',
      onChange: jest.fn(),
      value: ['option-one']
    },
    label: 'Options',
    meta: {},
    placeholder: 'Type to Search',
    results: [
      { value: 'option-one' },
      { value: 'option-two' }
    ]
  };

  it('renders Combobox typeahead', () => {
    const wrapper = shallow(<ComboBoxTypeaheadWrapper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Combobox typeahead with error', () => {
    const meta = {
      active: false,
      error: 'Oh no!',
      touched: true
    };
    const wrapper = shallow(<ComboBoxTypeaheadWrapper {...props} meta={meta}/>);
    expect(wrapper.prop('error')).toEqual('Oh no!');
  });
});
