import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import ComboBox from '../ComboBox';

jest.mock('src/context/HibanaContext');

describe('ComboBox Matchbox component wrapper', () => {
  const subject = () => shallow(<ComboBox>insert text field here</ComboBox>);

  it('renders the Hibana version of the ComboBox component correctly when Hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaComboBox');
  });

  it('renders the OG version of the ComboBox when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('ComboBox');
  });
});
