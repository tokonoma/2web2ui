import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import TextField from '../TextField';

jest.mock('src/context/HibanaContext');

describe('TextField Matchbox component wrapper', () => {
  const subject = props => {
    const defaults = { padding: '600' };

    return shallow(
      <TextField {...defaults} {...props}>
        Children...
      </TextField>,
    );
  };

  it('renders the Hibana version of the TextField component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveProp('padding', '600');
    expect(wrapper).toHaveDisplayName('HibanaTextField');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).not.toHaveProp('padding', '600');
    expect(wrapper).toHaveDisplayName('TextField');
  });
});
