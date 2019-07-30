import { shallow } from 'enzyme';
import React from 'react';

import { SeedListPage } from '../SeedListPage';

describe('Page: SeedList tests', () => {

  const subject = ({ ...props }) => shallow(<SeedListPage {...props} />);

  it('should render page correctly with defaults', () => {
    const mockGetSeedList = jest.fn();
    const wrapper = subject({ seeds: [], getSeedList: mockGetSeedList });

    expect(wrapper).toMatchSnapshot();
    expect(mockGetSeedList).toHaveBeenCalled();
  });
});
