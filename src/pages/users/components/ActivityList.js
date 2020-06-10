import React from 'react';
import {
  CallMade,
  ChangeHistory,
  Mouse,
  OpenInBrowser,
  Streetview,
} from '@sparkpost/matchbox-icons';
import { formatTime } from 'src/helpers/date';
import useModal from 'src/hooks/useModal';
import { Button, Modal, Panel, Text } from 'src/components/matchbox';
import { LabelledValue } from 'src/components';
import { Activity } from 'src/components/activity';

export default function ActivityList({ activities }) {
  const { openModal, closeModal, isModalOpen, meta = {} } = useModal();

  return (
    <Activity>
      {activities.map((activity, index) => {
        return (
          <div key={`activity-${index}`}>
            <Activity.Item>
              <Activity.Content>
                <Activity.Avatar>
                  <ActivityIcon type={activity.type} />
                </Activity.Avatar>

                <Text>
                  <ActivityDescription activity={activity} />
                  <Activity.ViewMore onClick={() => openModal({ activity })} />
                </Text>

                <Activity.Time>{formatTime(activity.time)}</Activity.Time>
              </Activity.Content>
            </Activity.Item>
          </div>
        );
      })}

      <Modal open={isModalOpen} showCloseButton={true} onClose={() => closeModal()}>
        <Panel title="Activity Event Details">
          <Panel.Section>
            {meta.activity && (
              <>
                {Object.keys(meta.activity).map(item => {
                  return <LabelledValue label={item} value={meta.activity[item]} />;
                })}
              </>
            )}
          </Panel.Section>

          <Panel.Section>
            <Button variant="secondary" onClick={() => closeModal()}>
              Got it.
            </Button>
          </Panel.Section>
        </Panel>
      </Modal>
    </Activity>
  );
}

function ActivityIcon({ type }) {
  switch (type) {
    case 'click':
      return <Mouse />;
    case 'api_request':
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
  const { uid, type, detail } = activity;

  switch (type) {
    case 'click':
      return (
        <>
          <strong>{uid}</strong> clicked on <strong>{detail}</strong>.
        </>
      );
    case 'api_request':
      return (
        <>
          <strong>{uid}</strong> made a request to <strong>{detail}</strong>.
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
