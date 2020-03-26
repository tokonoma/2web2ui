import React from 'react';
import { shallow, mount } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import ScreenReaderOnly from '../ScreenReaderOnly';

jest.mock('src/context/HibanaContext');

describe('ScreenReaderOnly Matchbox component wrapper', () => {
  const subject = props => {
    return shallow(<ScreenReaderOnly {...props}>Children...</ScreenReaderOnly>);
  };

  it('renders the Hibana version of the ScreenReaderOnly component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('HibanaScreenReaderOnly');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('ScreenReaderOnly');
  });

  it('renders with a passed in "id" prop', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = mount(<ScreenReaderOnly id="my-id">Children</ScreenReaderOnly>);

    expect(wrapper).toHaveProp('id', 'my-id');
  });

  it('renders as the passed in element via the "as" prop', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = mount(<ScreenReaderOnly as="div">Children</ScreenReaderOnly>);

    expect(wrapper.find('div')).toExist();
  });
});
