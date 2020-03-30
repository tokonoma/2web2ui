import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '../Toggle';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Toggle Matchbox component wrapper', () => {
  const subject = () => {
    return shallow(<Toggle id="toggleid" />);
  };
  it('renders the HibanaToggle component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaToggle');
  });

  it('renders the OGToggle component correctly when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('OGToggle');
  });
});
