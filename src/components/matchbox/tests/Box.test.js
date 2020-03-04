import React from 'react';
import Box from '../Box';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

jest.mock('@sparkpost/matchbox-hibana', () => ({
  Box: props => <div data-id="hibana-box" {...props} />,
}));

describe('Box matchbox component wrapper', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      bg: 'magenta.400',
      padding: '600',
    };

    return render(
      <Box {...defaults} {...props}>
        Children...
      </Box>,
    );
  };

  it('renders Hibana component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText, queryByTestId } = subject();
    expect(queryByTestId('hibana-box')).toHaveAttribute('bg', 'magenta.400');
    expect(queryByTestId('hibana-box')).toHaveAttribute('padding', '600');
    expect(queryByText('Children...')).toBeInTheDocument();
  });

  it('ignores box and just renders the child components when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText, queryByTestId } = subject();
    expect(queryByTestId('hibana-box')).not.toBeInTheDocument();
    expect(queryByText('Children...')).toBeInTheDocument();
  });
});
