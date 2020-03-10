import React from 'react';
import Stack from '../Stack'; //Component name
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

const mockDataId = 'hibana-stack'; //enter any text
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Stack: props => <div data-id={mockDataId} {...props} />,
}));

describe('Stack matchbox component wrapper', () => {
  const props = { space: '200' }; // Enter the default props
  const subject = () => render(<Stack {...props}>Children...</Stack>);

  it('renders Hibana component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = subject();
    Object.keys(props).forEach(key => {
      expect(queryByText('Children...')).toHaveAttribute(key, props[key]);
    });
    expect(queryByText('Children...')).toBeInTheDocument();
  });

  it('ignores Hibana component and just renders the child components when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText, queryByTestId } = subject();
    expect(queryByTestId(mockDataId)).not.toBeInTheDocument();
    expect(queryByText('Children...')).toBeInTheDocument();
  });
});
