import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import ComboBoxMenu from '../ComboBoxMenu';

jest.mock('src/context/HibanaContext');

describe('ComboBoxMenu Matchbox component wrapper', () => {
  const subject = () => shallow(<ComboBoxMenu items={[{ content: 'a' }, { content: 'b' }]} />);

  it('renders the Hibana version of the ComboBoxMenu component correctly when Hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaComboBoxMenu');
  });

  it('renders the OG version of the ComboBoxMenu when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('ComboBoxMenu');
  });
});
