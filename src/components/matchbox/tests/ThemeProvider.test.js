import React from 'react';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
import ThemeProvider from '../ThemeProvider';

jest.mock('src/context/HibanaContext');

describe('ThemeProvider Matchbox component wrapper', () => {
  const subject = () => {
    return shallow(<ThemeProvider>Children...</ThemeProvider>);
  };

  it('renders the Hibana version of the ThemeProvider component correctly when hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = subject();

    expect(wrapper).toHaveDisplayName('HibanaThemeProvider');
    expect(wrapper).toHaveTextContent('Children...');
  });

  it('only renders passed in children when hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = subject();

    expect(wrapper).not.toHaveDisplayName('HibanaThemeProvider');
    expect(wrapper).toHaveTextContent('Children...');
  });
});
