import React from 'react';
import Select from '../Select';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox', () => ({
  Select: () => <div>default Select</div>,
}));
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Select: () => <div>hibana Select</div>,
}));

describe('Select Matchbox component wrapper', () => {
  const defaultProps = {
    icon: '',
    title: 'Select Component',
    id: 'Select',
    subtitle: 'click to expand',
  };
  const subject = () => {
    return render(<Select {...defaultProps}> This is the content. </Select>);
  };

  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = subject();
    expect(queryByText('hibana Select')).toBeInTheDocument();
    expect(queryByText('default Select')).not.toBeInTheDocument();
  });
  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText } = subject();
    expect(queryByText('hibana Select')).not.toBeInTheDocument();
    expect(queryByText('default Select')).toBeInTheDocument();
  });
});
