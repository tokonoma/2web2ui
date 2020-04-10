import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import ComboBoxTextField from '../ComboBoxTextField';

jest.mock('src/context/HibanaContext');

describe('ComboBoxTextField Matchbox component wrapper', () => {
  const subject = () =>
    shallow(<ComboBoxTextField id="test-text-field" label="Test Example" value="" />);

  it('renders the Hibana version of the ComboBoxTextField component correctly when Hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaComboBoxTextField');
  });

  it('renders the OG version of the ComboBoxTextField when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('ComboBoxTextField');
  });
});
