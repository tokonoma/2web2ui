import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, ScreenReaderOnly } from '@sparkpost/matchbox';
import { Notifications, NotificationsUnread } from '@sparkpost/matchbox-icons';
import Notification from './Notification';
import * as notificationActions from 'src/actions/notifications';
import { selectTransformedNotifications, selectUnreadCount } from 'src/selectors/notifications';
import styles from './NotificationCenter.module.scss';

const NotificationCenterTrigger = (props) => {
  const { unreadCount } = props;
  const hasUnreadNotifications = unreadCount > 0;

  return (
    <button className={styles.NotificationCenterTrigger}>
      {hasUnreadNotifications ? (
        <>
          <NotificationsUnread className={styles.UnreadIcon} size={22}/>

          <ScreenReaderOnly>{unreadCount} <span>Unread Notifications</span></ScreenReaderOnly>
        </>
      ) : (
        <>
          <Notifications size={22}/>

          <ScreenReaderOnly>0 Unread Notifications</ScreenReaderOnly>
        </>
      )}
    </button>
  );
};

export class NotificationCenter extends Component {
  componentDidMount() {
    this.props.loadNotifications();
  }

  renderNotificationsList = () => {
    const { notifications } = this.props;

    if (!notifications || notifications.length === 0) {
      return <div className={styles.Empty}><small>No notifications at this time.</small></div>;
    }

    return notifications.map(({ id, meta, ...rest }) => <Notification {...rest} {...meta} key={id} />);
  }

  render() {
    return (
      <Popover
        left
        onClose={this.props.markAllAsRead}
        trigger={<NotificationCenterTrigger unreadCount={this.props.unreadCount}/>}
      >
        <div className={styles.ListWrapper}>
          {this.renderNotificationsList()}
        </div>
      </Popover>
    );
  }
}

const mstp = (state) => ({
  notifications: selectTransformedNotifications(state),
  unreadCount: selectUnreadCount(state)
});
export default connect(mstp, notificationActions)(NotificationCenter);
