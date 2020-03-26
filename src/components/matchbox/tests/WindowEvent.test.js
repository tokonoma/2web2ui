import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import WindowEvent from '../WindowEvent';

jest.mock('src/context/HibanaContext');

describe('WindowEvent Matchbox component wrapper', () => {
  const subject = () => {
    return shallow(<WindowEvent event="keydown" handler={() => {}} />);
  };

  it('renders with passed in props', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveProp('event', 'keydown');
  });

  it('renders the Hibana version of the WindowEvent component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('HibanaWindowEvent');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('WindowEvent');
  });
});
