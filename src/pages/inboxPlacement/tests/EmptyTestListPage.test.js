import { shallow } from 'enzyme';
import React from 'react';
import EmptyTestListPage from '../EmptyTestListPage';

describe('Component: EmptyTestListPage', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = shallow(<EmptyTestListPage />);
  });

  it('renders (children) correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
