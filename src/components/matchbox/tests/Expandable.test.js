import React from 'react';
import Expandable from '../Expandable';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox', () => ({
  Expandable: () => <div>default expandable</div>,
}));
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Expandable: () => <div>hibana expandable</div>,
}));

describe('Expandable Matchbox component wrapper', () => {
  const defaultProps = {
    icon: '',
    title: 'Expandable Component',
    id: 'expandable',
    subtitle: 'click to expand',
  };
  const subject = () => {
    return render(<Expandable {...defaultProps}> This is the content. </Expandable>);
  };

  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = subject();
    expect(queryByText('hibana expandable')).toBeInTheDocument();
    expect(queryByText('default expandable')).not.toBeInTheDocument();
  });
  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText } = subject();
    expect(queryByText('hibana expandable')).not.toBeInTheDocument();
    expect(queryByText('default expandable')).toBeInTheDocument();
  });
});
