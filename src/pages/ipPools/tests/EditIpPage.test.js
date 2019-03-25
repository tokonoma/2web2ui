import { shallow } from 'enzyme';
import React from 'react';
import _ from 'lodash';
import { EditIpPage } from '../EditIpPage';

describe('IP Edit Page', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      listPools: jest.fn(),
      pool: { name: 'My Pool', id: 'my-pool' },
      loading: false,
      ip: { external_ip: '1.1.1.1', ip_pool: 'foo' },
      updateSendingIp: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      match: {
        params: {
          id: 'my-pool'
        }
      },
      history: {
        replace: jest.fn()
      }
    };

    wrapper = shallow(<EditIpPage {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('loads data after mount', () => {
    expect(props.listPools).toHaveBeenCalledTimes(1);
  });

  it('renders loader when loading is true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.exists('Loading')).toBe(true);
    expect(wrapper.exists('Page')).toBe(false);
  });

  it('renders loader when no pool', () => {
    wrapper.setProps({ pool: null });
    expect(wrapper.exists('Loading')).toBe(true);
    expect(wrapper.exists('Page')).toBe(false);
  });

  it('renders loader when no ip', () => {
    wrapper.setProps({ ip: null });
    expect(wrapper.exists('Loading')).toBe(true);
    expect(wrapper.exists('Page')).toBe(false);
  });

  it('invokes updateSendingIp function upon submitting the ip form', () => {
    wrapper.find('IpForm').simulate('submit', {});
    expect(props.updateSendingIp).toHaveBeenCalled();
  });

  it('renders error banner', () => {
    const err = new Error('API Failed');
    wrapper.setProps({ error: err });
    expect(wrapper.exists('ApiErrorBanner')).toBe(true);
    expect(wrapper.find('ApiErrorBanner')).toMatchSnapshot();
  });

  it('reloads data on upon clicking on reload button on error banner', () => {
    const err = new Error('API Failed');
    wrapper.setProps({ error: err });
    wrapper.find('ApiErrorBanner').prop('reload')();
    expect(props.listPools).toHaveBeenCalled();
  });

  describe('onUpdateIp', () => {
    let ipData;
    beforeEach(() => {
      ipData = { ip_pool: 'foo', auto_warmup_enabled: true, auto_warmup_stage: 2 };
    });

    it('updates ip with ip pool data', async () => {
      await wrapper.instance().onUpdateIp(ipData);
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', ipData);
      expect(props.showAlert).toHaveBeenCalledTimes(1);
      expect(props.history.replace).not.toHaveBeenCalled();
    });

    it('removes auto_warmup_stage if ip warmup is not enabled', async () => {
      ipData.auto_warmup_enabled = false;
      await wrapper.instance().onUpdateIp(ipData);
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', _.omit(ipData, 'auto_warmup_stage'));
      expect(props.showAlert).toHaveBeenCalledTimes(1);
    });

    it('throws on error', async () => {
      const err = new Error('API Failed');
      props.updateSendingIp.mockReturnValue(Promise.reject(err));
      await expect(wrapper.instance().onUpdateIp(ipData)).rejects.toThrow(err);
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', ipData);
      expect(props.showAlert).toHaveBeenCalledTimes(0);
    });

    it('redirects to new pool if ip reassigned', async () => {
      const updatedIpData = { ...ipData, ip_pool: 'bar' };
      await wrapper.instance().onUpdateIp(updatedIpData);
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', updatedIpData);
      expect(props.history.replace).toHaveBeenCalledWith('/account/ip-pools/edit/bar/1.1.1.1');
    });
  });
});
