import React from 'react';
import Snackbar from '../Snackbar';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');
jest.mock('@sparkpost/matchbox-hibana', () => ({
  Snackbar: () => <div data-id="hibana-snackbar">This is a message</div>,
}));

describe('Snackbar Matchbox component wrapper', () => {
  const defaultProps = {
    onDismiss: () => jest.fn(),
    status: 'success',
    children: 'This is a message',
  };
  const subject = props => {
    return shallow(<Snackbar {...props} {...defaultProps}></Snackbar>);
  };

  it('should not pass hibana props when it is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const instance = subject({ status: 'success', maxWidth: 500, size: 'normal', my: 50 });
    expect(
      instance
        .find('Snackbar')
        .last()
        .props(),
    ).toHaveProperty('status');
    expect(
      instance
        .find('Snackbar')
        .last()
        .props(),
    ).toHaveProperty('maxWidth');
    expect(
      instance
        .find('Snackbar')
        .last()
        .props(),
    ).not.toHaveProperty('size');
    expect(
      instance
        .find('Snackbar')
        .last()
        .props(),
    ).not.toHaveProperty('my');
  });

  it('renders the Hibana version of the Snackbar component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject({ mb: 0, pt: 5 });

    expect(wrapper).toMatchSnapshot();
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject({ mb: 0, pt: 5 });

    expect(wrapper).toMatchSnapshot();
  });
});
