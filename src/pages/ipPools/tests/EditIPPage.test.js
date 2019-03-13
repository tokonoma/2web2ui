import { shallow } from 'enzyme';
import React from 'react';
import { EditIpPage } from '../EditIPPage';

describe('IP Edit Page', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      listPools: jest.fn(),
      getPool: jest.fn(),
      currentPool: { name: 'My Pool', id: 'my-pool' },
      loading: false,
      currentIp: { external_ip: '1.1.1.1' },
      updateSendingIp: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      match: {
        params: {
          id: 'my-pool'
        }
      }
    };

    wrapper = shallow(<EditIpPage {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('loads data after mount', () => {
    expect(props.listPools).toHaveBeenCalledTimes(1);
    expect(props.getPool).toHaveBeenCalledTimes(1);
  });

  it('renders loader when loading is true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.exists('Loading')).toBe(true);
    expect(wrapper.exists('Page')).toBe(false);
  });
  it('renders loader when no ip', () => {
    wrapper.setProps({ currentIp: null });
    expect(wrapper.exists('Loading')).toBe(true);
    expect(wrapper.exists('Page')).toBe(false);
  });

  it('renders errors', () => {
    const err = new Error('API Failed');
    wrapper.setProps({ error: err });
    expect(wrapper.exists('ApiErrorBanner')).toBe(true);
    expect(wrapper.find('ApiErrorBanner')).toMatchSnapshot();
  });

  describe('onUpdateIp', () => {
    it('updates ip with ip pool data', async () => {
      await wrapper.instance().onUpdateIp({ ip_pool: 'foo' });
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', 'foo');
      expect(props.showAlert).toHaveBeenCalledTimes(1);
    });
    it('throws on error', async () => {
      const err = new Error('API Failed');
      props.updateSendingIp.mockReturnValue(Promise.reject(err));
      await expect(wrapper.instance().onUpdateIp({ ip_pool: 'bar' })).rejects.toThrow(err);
      expect(props.updateSendingIp).toHaveBeenCalledWith('1.1.1.1', 'bar');
      expect(props.showAlert).toHaveBeenCalledTimes(0);
    });
  });
});
