import React from 'react';
import Inline from '../Inline';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Inline: props => <div data-id="hibana-inline" {...props} />,
}));

describe('Inline Matchbox component wrapper', () => {
  const subject = props => {
    const defaults = { padding: '600' };

    return render(
      <Inline {...defaults} {...props}>
        Children...
      </Inline>,
    );
  };

  it('renders the Hibana version of the Inline component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const { queryByText, queryByTestId } = subject();
    expect(queryByTestId('hibana-inline')).toBeInTheDocument();
    expect(queryByText('Children...')).toBeInTheDocument();
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const { queryByText, queryByTestId } = subject();
    expect(queryByTestId('hibana-inline')).not.toBeInTheDocument();
    expect(queryByText('Children...')).toBeInTheDocument();
  });
});
