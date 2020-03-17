import React from 'react';
import Button from '../Button.js';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');

jest.mock('@sparkpost/matchbox', () => ({
  Button: () => <div>default button</div>,
}));

jest.mock('@sparkpost/matchbox-hibana', () => ({
  Button: () => <div>hibana button</div>,
}));

describe('Button', () => {
  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = render(<Button />);
    expect(queryByText('hibana button')).toBeInTheDocument();
    expect(queryByText('default button')).not.toBeInTheDocument();
  });

  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText } = render(<Button />);
    expect(queryByText('hibana button')).not.toBeInTheDocument();
    expect(queryByText('default button')).toBeInTheDocument();
  });
});
