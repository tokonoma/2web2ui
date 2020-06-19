import React from 'react';
import { shallow } from 'enzyme';
import SettingsSection from '../SettingsSection';

describe('SettingsSection', () => {
  it('renders a screen reader only heading', () => {
    expect(shallow(<SettingsSection />)).toHaveTextContent('Template Settings');
  });
});
