import React from 'react';
import { shallow } from 'enzyme';
import { ListPage, Actions } from '../ListPage';
import TimeAgo from 'react-timeago';

describe('Page: Users List', () => {

  let props;
  let wrapper;
  let instance;

  beforeEach(() => {
    props = {
      currentUser: {
        username: 'test-user-1'
      },
      loading: false,
      listUsers: jest.fn(),
      listSubaccounts: jest.fn(() => []),
      hasSubaccounts: false,
      subaccounts: [],
      users: [
        { name: 'Test User 1', username: 'test-user-1', access: 'admin', email: 'user1@test.com', tfa_enabled: false },
        { name: 'Test User 2', username: 'test-user-2', access: 'admin', email: 'user2@test.com', tfa_enabled: true },
        { name: 'Test User 3', username: 'test-user-3', access: 'admin', email: 'user3@test.com', tfa_enabled: true, subaccount_id: 125 }
      ],
      isSubAccountReportingLive: true
    };
    wrapper = shallow(<ListPage {...props} />);
    instance = wrapper.instance();
  });

  it('should render correctly by default', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with an error', () => {
    wrapper.setProps({
      error: {
        message: 'Uh oh! It broke.'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render loading correctly', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should transform row data for the table collection', () => {
    const row = instance.getRowData({
      name: 'test-name',
      roleLabel: 'Admin',
      username: 'test-username',
      isCurrentUser: false,
      access: 'admin',
      email: 'testemail',
      tfa_enabled: false
    });

    expect(row).toMatchSnapshot();
  });

  it('should transform row data for the table collection, with a last login date', () => {
    const row = instance.getRowData({
      name: 'test-name',
      isCurrentUser: false,
      access: 'admin',
      email: 'testemail',
      last_login: new Date()
    });

    const wrapper = shallow(<div>{row[3]}</div>);
    const timeAgoProps = wrapper.find(TimeAgo).props();
    expect(timeAgoProps.date).toBeInstanceOf(Date);
    expect(timeAgoProps.live).toEqual(false);
  });

  // This assumes `hasSubaccounts=false` in the wrapper as a precondition
  it('should render subaccount info when the account uses them', () => {
    wrapper.setProps({ hasSubaccounts: true });
    expect(wrapper.find('TableCollection').prop('columns')).toContainEqual(expect.objectContaining({
      label: 'Subaccount'
    }));
  });

  it('should not render subaccount info when the feature is disabled', () => {
    wrapper.setProps({ hasSubaccounts: true, isSubAccountReportingLive: false });
    expect(wrapper.find('TableCollection').prop('columns')).not.toContainEqual(expect.objectContaining({
      label: 'Subaccount'
    }));
  });

  it('should render ActionPopover', () => {
    props = {
      username: 'test-username',
      deletable: true,
      onDelete: jest.fn()
    };

    const wrapper = shallow(<Actions {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle delete', () => {
    instance.handleDeleteRequest('test-user-1');
    expect(wrapper.state('userToDelete')).toEqual(props.users[0]);
  });

  it('should show a delete modal', () => {
    wrapper.setState({ userToDelete: 'test-name' });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle cancel', () => {
    instance.handleCancel();
    expect(wrapper.state('userToDelete')).toEqual({});
  });
});
