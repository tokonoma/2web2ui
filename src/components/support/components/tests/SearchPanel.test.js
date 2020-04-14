import React from 'react';
import { shallow } from 'enzyme';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import SearchPanel, { OGSearchPanel } from '../SearchPanel';

jest.mock('src/hooks/useHibanaToggle');
useHibanaToggle.mockReturnValue(OGSearchPanel);

describe('SearchPanel', () => {
  it('renders search panel', () => {
    const wrapper = shallow(<SearchPanel />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders search panel with default search text', () => {
    const wrapper = shallow(<SearchPanel defaultSearchText="example" />);
    expect(wrapper).toMatchSnapshot();
  });
});
