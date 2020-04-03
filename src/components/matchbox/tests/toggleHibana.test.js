import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import { toggleHibana } from '..';
jest.mock('src/context/HibanaContext');

describe('Text matchbox component wrapper', () => {
  function OGComponent() {
    return <>OGComponent</>;
  }
  function HibanaComponent() {
    return <>HibanaComponent</>;
  }
  const subject = () => shallow(toggleHibana(OGComponent, HibanaComponent)());

  it('renders Hibana component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('HibanaComponent');
  });

  it('ignores Hibana component and just renders the child components when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('OGComponent');
  });
});
