import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { WatchListPage } from '../WatchListPage';

describe('WatchListPage', () => {
  const monitors = [
    {
      resource: '101.101',
      currently_blacklisted_on: [],
      total_listing_count: 2,
      active_listing_count: 2,
      watched_at: '2019-07-13T00:00:00.000Z',
      last_listed_at: '2019-07-20T00:00:00.000Z',
    },
  ];

  const mockListMonitors = jest.fn();

  const renderSubject = ({ ...props }) => {
    const defaults = {
      monitors: monitors,
      error: null,
      loading: null,
      listMonitors: mockListMonitors,
      hasBlacklisted: true,
    };
    return render(
      <MemoryRouter>
        <WatchListPage {...defaults} {...props} />
      </MemoryRouter>,
    );
  };

  const shallowSubject = ({ ...props }) => {
    const defaults = {
      monitors: monitors,
      error: null,
      loading: null,
      listMonitors: mockListMonitors,
      hasBlacklisted: true,
    };
    return shallow(<WatchListPage {...defaults} {...props} />);
  };

  it('renders loading component when loading data', () => {
    const { queryByTestId } = renderSubject({ loading: true });
    expect(queryByTestId('loading')).toBeInTheDocument();
  });

  it('renders error banner when an error occurs', () => {
    const wrapper = shallowSubject({ error: { message: 'You dun goofed' } });
    expect(wrapper.find({ 'data-id': 'error-banner' })).toExist();
  });

  it('renders congratulations banner when no current blacklistings', () => {
    const { queryByTestId } = renderSubject({ hasBlacklisted: false });
    expect(queryByTestId('congrats-banner')).toBeInTheDocument();
  });

  it('Congrats Banner onDismiss correctly closes the banner', () => {
    const wrapper = shallowSubject({ hasBlacklisted: false });
    const bannerWrapper = wrapper.find('CongratsBanner');
    expect(bannerWrapper).toExist();
    bannerWrapper.prop('onDismiss')();
    const bannerWrapperAfterDismiss = wrapper.find('CongratsBanner');
    expect(bannerWrapperAfterDismiss).not.toExist();
  });

  it('renders Monitors Collection when correct data exists', () => {
    const wrapper = shallowSubject();
    expect(wrapper.find({ 'data-id': 'monitors-table' })).toExist();
  });

  it('loads monitors when page starts rendering', () => {
    renderSubject();
    expect(mockListMonitors).toHaveBeenCalled();
  });
});
