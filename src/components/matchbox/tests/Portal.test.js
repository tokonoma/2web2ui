import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Portal from '../Portal';

jest.mock('src/context/HibanaContext');

describe('Portal Matchbox component wrapper', () => {
  const subject = () => {
    return shallow(<Portal containerId="my-portal">Children...</Portal>);
  };

  it('renders the Hibana version of the Portal component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('HibanaPortal');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('Portal');
  });
});
