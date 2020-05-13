import React from 'react';
import { shallow } from 'enzyme';
import Definition from '../Definition';

jest.mock('src/hooks/useUniqueId/useUniqueId');

describe('Definition', () => {
  const subject = () =>
    shallow(
      <Definition>
        <Definition.Label>Inbox</Definition.Label>
        <Definition.Value>88%</Definition.Value>
      </Definition>,
    );

  it('renders', () => {
    const wrapper = subject();
    expect(wrapper).toHaveTextContent('Inbox');
    expect(wrapper).toHaveTextContent('88%');
  });

  it('renders with aria label props', () => {
    const wrapper = subject();
    expect(wrapper.find('#definition-0')).toExist();
    expect(wrapper.find({ ariaLabelledby: 'definition-0' })).toExist();
  });
});
