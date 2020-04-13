import React from 'react';
import Grid from '../Grid';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';
jest.mock('src/context/HibanaContext');

describe('Grid', () => {
  it('renders the Hibana <Grid/> when Hibana enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = shallow(<Grid />);

    expect(wrapper).toHaveDisplayName('HibanaGrid');
  });

  it('renders the OG <Grid/> when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = shallow(<Grid />);

    expect(wrapper).toHaveDisplayName('Grid');
  });

  it('renders the Hibana <Grid.Column/> when Hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = shallow(<Grid.Column />);

    expect(wrapper).toHaveDisplayName('HibanaGrid.Column');
  });

  it('renders the OG <Grid.Column/> component when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = shallow(<Grid.Column />);

    expect(wrapper).toHaveDisplayName('Grid.Column');
  });

  it('renders with passed in props when Hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: true }]);

    const wrapper = shallow(<Grid>Children!</Grid>);

    expect(wrapper).toHaveProp('children', 'Children!');
  });

  it('renders with passed in props when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = shallow(<Grid>Children!</Grid>);

    expect(wrapper).toHaveProp('children', 'Children!');
  });

  it('does not render `styled-system` props when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    const wrapper = shallow(<Grid mb="300">Children!</Grid>);

    expect(wrapper).not.toHaveProp('mb', '300');
  });
});
