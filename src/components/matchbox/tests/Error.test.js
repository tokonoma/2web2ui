import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import Error from '../Error';

jest.mock('src/context/HibanaContext');
// jest.mock('@sparkpost/matchbox-hibana', () => ({
//   Error: props => <div data-id="hibana-inline" {...props} />,
// }));

describe('Error Matchbox component wrapper', () => {
  const subject = props => {
    const defaults = { padding: '600' };

    return shallow(
      <Error {...defaults} {...props}>
        Children...
      </Error>,
    );
  };

  it('renders the Hibana version of the Error component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveProp('padding', '600');
    expect(wrapper).toHaveDisplayName('HibanaError');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).not.toHaveProp('padding', '600');
    expect(wrapper).toHaveDisplayName('Error');
  });
});
