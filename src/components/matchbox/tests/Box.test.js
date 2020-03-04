import React from 'react';
import Box from '../Box';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

const mockDataId = 'hibana-box';
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Box: props => <div data-id={mockDataId} {...props} />,
}));

describe('Box matchbox component wrapper', () => {
  const props = {
    bg: 'magenta.400',
    padding: '600',
  };
  const subject = () => render(<Box {...props}>Children...</Box>);

  it('renders Hibana component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = subject();
    Object.keys(props).forEach(key => {
      expect(queryByText('Children...')).toHaveAttribute(key, props[key]);
    });
    expect(queryByText('Children...')).toBeInTheDocument();
  });

  it('ignores box and just renders the child components when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText, queryByTestId } = subject();
    expect(queryByTestId(mockDataId)).not.toBeInTheDocument();
    expect(queryByText('Children...')).toBeInTheDocument();
  });
});
