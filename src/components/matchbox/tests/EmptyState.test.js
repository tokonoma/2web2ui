import React from 'react';
import { shallow } from 'enzyme';
import EmptyState from '../EmptyState';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('EmptyState Matchbox component wrapper', () => {
  const subject = () => {
    return shallow(<EmptyState id="EmptyStateid" />);
  };
  it('renders the HibanaEmptyState component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('HibanaEmptyState');
  });

  it('renders the OGEmptyState component correctly when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveDisplayName('OGEmptyState');
  });
});
