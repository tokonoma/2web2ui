import { shallow } from 'enzyme';
import React from 'react';

import { SeedListPage } from '../SeedListPage';

describe('Page: SeedList tests', () => {
  const subject = ({ ...props }) => {
    const defaults = {
      loading: false,
      seeds: [],
      getSeedList: jest.fn(),
      referenceSeed: 'ref1@sparkpost.com'
    };
    return shallow(<SeedListPage {...defaults} {...props} />);
  };

  it('should render page correctly with defaults', () => {
    const mockGetSeedList = jest.fn();
    const wrapper = subject({ getSeedList: mockGetSeedList });

    expect(wrapper).toMatchSnapshot();
    expect(mockGetSeedList).toHaveBeenCalled();
  });

  it('renders loading', () => {
    const wrapper = subject({ pending: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('renders error message', () => {
    const wrapper = subject({ error: true });
    expect(wrapper.find('ApiErrorBanner')).toExist();
  });
});
