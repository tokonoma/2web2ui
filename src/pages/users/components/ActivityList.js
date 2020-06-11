import React from 'react';
import {
  CallMade,
  ChangeHistory,
  Mouse,
  OpenInBrowser,
  Streetview,
} from '@sparkpost/matchbox-icons';
import { isSameDate, formatDate, formatTime } from 'src/helpers/date';
import useModal from 'src/hooks/useModal';
import { Box, Button, Modal, Panel, Text } from 'src/components/matchbox';
import { LabelledValue } from 'src/components';
import { Activity } from 'src/components/activity';

export default function ActivityList({ activities }) {
  const { openModal, closeModal, isModalOpen, meta = {} } = useModal();

  return (
    <Activity>
      {formatActivities(activities).map((activity, index) => {
        const timestamp = new Date(activity.time);
        const fixedTimestamp = timestamp.setHours(timestamp.getHours() - 4);

        return (
          <div key={`activity-${index}`}>
            {activity.isPreviousDateDifferent && (
              <Activity.Date>{formatDate(activity.time)}</Activity.Date>
            )}

            <Activity.Item>
              <Activity.Content>
                <Activity.Avatar hasConnector={!activity.isNextDateDifferent}>
                  <ActivityIcon type={activity.type} />
                </Activity.Avatar>

                <Text>
                  <ActivityDescription activity={activity} />
                  <Activity.ViewDetails onClick={() => openModal({ activity })} />
                </Text>

                <Activity.Time>{formatTime(fixedTimestamp)}</Activity.Time>
              </Activity.Content>
            </Activity.Item>
          </div>
        );
      })}

      <Modal open={isModalOpen} showCloseButton={true} onClose={() => closeModal()}>
        <Panel title="Activity Event Details">
          <Panel.Section>
            {meta.activity ? (
              <>
                {Object.keys(meta.activity).map((item, index) => {
                  return (
                    <LabelledValue label={item} value={meta.activity[item]} key={`item-${index}`} />
                  );
                })}
              </>
            ) : (
              <>
                {/* Hacky, but helps prevent Modal from collapsing before it animates out - we could use some hooks in to the animation completion *or* use placeholder UI, i.e. skeleton loaders */}
                <Box height="460px" />
              </>
            )}
          </Panel.Section>

          <Panel.Section>
            <Button variant="primary" onClick={() => closeModal()}>
              Got it.
            </Button>
          </Panel.Section>
        </Panel>
      </Modal>
    </Activity>
  );
}

function formatActivities(activities) {
  return activities.map((activity, index) => {
    const previousActivity = activities[index - 1];
    const nextActivity = activities[index + 1];

    return {
      ...activity,
      isPreviousDateDifferent: previousActivity
        ? isSameDate(activity.time, previousActivity.time)
        : true,
      isNextDateDifferent: nextActivity ? isSameDate(activity.time, nextActivity.time) : true,
    };
  });
}

function ActivityIcon({ type }) {
  switch (type) {
    case 'click':
      return <Mouse />;
    case 'request':
      return <CallMade />;
    case 'pageview':
      return <OpenInBrowser />;
    case 'change':
      return <ChangeHistory />;
    case 'login':
      return <Streetview />;
    default:
      return null;
  }
}

function ActivityDescription({ activity }) {
  const { uid, type, url, detail } = activity;

  switch (type) {
    case 'click':
      return (
        <>
          <strong>{uid}</strong> clicked on <strong>{detail.replace('Click on a ', '')}</strong>.
        </>
      );
    case 'request':
      return (
        <>
          <strong>{uid}</strong> made a request to <strong>{url}</strong>.
        </>
      );
    case 'pageview':
      return (
        <>
          <strong>{uid}</strong> visited <strong>{detail}</strong>.
        </>
      );
    case 'change':
      return (
        <>
          <strong>{uid}</strong> changed <strong>{detail}</strong>.
        </>
      );
    case 'login':
      return (
        <>
          <strong>{uid}</strong> logged in.
        </>
      );
    default:
      return null;
  }
}
