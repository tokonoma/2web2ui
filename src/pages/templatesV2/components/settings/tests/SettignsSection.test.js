import React from 'react';
import { shallow } from 'enzyme';
import SettingsSection from '../SettingsSection';


describe('SettingsSection', () => {
  it('renders form', () => {
    expect(shallow(<SettingsSection />)).toMatchSnapshot();
  });
});
