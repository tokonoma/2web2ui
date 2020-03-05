import React from 'react';
import ProgressBar from '../ProgressBar.js';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox', () => ({
  ProgressBar: () => <div>default progress bar</div>,
}));
jest.mock('@sparkpost/matchbox-hibana', () => ({
  ProgressBar: () => <div>hibana progress bar</div>,
}));
describe('ProgressBar', () => {
  const subject = (method, props) => {
    return method(<ProgressBar {...props} />);
  };
  it('should only pass pre-hibana props when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const props = { completed: 50, color: 'orange', size: 'normal', my: 50 };
    const instance = subject(mount, props);
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).toHaveProperty('completed');
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).toHaveProperty('color');
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).not.toHaveProperty('size');
    expect(
      instance
        .find('ProgressBar')
        .last()
        .props(),
    ).not.toHaveProperty('my');
  });
  it('should only render hibana component when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);
    const { queryByText } = render(<ProgressBar />);
    expect(queryByText('hibana progress bar')).toBeInTheDocument();
    expect(queryByText('default progress bar')).not.toBeInTheDocument();
  });
  it('should only render matchbox component when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const { queryByText } = render(<ProgressBar />);
    expect(queryByText('hibana progress bar')).not.toBeInTheDocument();
    expect(queryByText('default progress bar')).toBeInTheDocument();
  });
});
