import React from 'react';
import { shallow } from 'enzyme';
import {
  NameField,
  TargetField,
  EventsRadioGroup,
  AuthDropDown,
  BasicAuthFields,
  OAuth2Fields,
  ActiveField
} from '../Fields.js';

it('should render NameField', () => {
  const wrapper = shallow(<NameField disabled={false}/>);

  expect(wrapper).toMatchSnapshot();
});

it('should render TargetField', () => {
  const wrapper = shallow(<TargetField disabled={false}/>);

  expect(wrapper).toMatchSnapshot();
});

it('should render EventsRadioGroup', () => {
  const wrapper = shallow(<EventsRadioGroup disabled={false}/>);

  expect(wrapper).toMatchSnapshot();
});

it('should render AuthDropDown', () => {
  const wrapper = shallow(<AuthDropDown disabled={false}/>);

  expect(wrapper).toMatchSnapshot();
});

it('should render BasicAuthFields', () => {
  const wrapper = shallow(<BasicAuthFields disabled={false}/>);

  expect(wrapper).toMatchSnapshot();
});

it('should render OAuth2Fields', () => {
  const wrapper = shallow(<OAuth2Fields disabled={false}/>);

  expect(wrapper).toMatchSnapshot();
});

it('should render ActiveField', () => {
  const wrapper = shallow(<ActiveField disabled={false}/>);
  expect(wrapper).toMatchSnapshot();
});
