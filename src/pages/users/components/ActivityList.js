import React, { useState } from 'react';
import {
  CallMade,
  ChangeHistory,
  Mouse,
  OpenInBrowser,
  Streetview,
} from '@sparkpost/matchbox-icons';
import { Button, Modal, Panel, Text } from 'src/components/matchbox';
import { Activity } from 'src/components/activity';

export default function ActivityList({ activities }) {
  /* eslint-disable-next-line */
  console.log('activities', activities);
  const [isModalOpen, setModalOpen] = useState(false);

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
                  <Activity.ViewMore onClick={() => setModalOpen(true)} />
                </Text>

                <Activity.Time>12:22 PM</Activity.Time>
              </Activity.Content>
            </Activity.Item>

            <Modal open={isModalOpen} showCloseButton={true} onClose={() => setModalOpen(false)}>
              <Panel title="Activity Event Details">
                <Panel.Section>
                  <p>Here are some event details</p>
                </Panel.Section>

                <Panel.Section>
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>
                    Got it.
                  </Button>
                </Panel.Section>
              </Panel>
            </Modal>
          </div>
        );
      })}
    </Activity>
  );

  return (
    <>
      <Activity>
        <Activity.Date>June 10</Activity.Date>

        {/* `click` event */}
        <Activity.Item>
          <Activity.Content>
            <Activity.Avatar>
              <Mouse />
            </Activity.Avatar>

            <Text>
              <strong>nlemmon86</strong> clicked on the <strong>Events</strong> link.
              <Activity.ViewMore onClick={() => setModalOpen(true)} />
            </Text>

            <Activity.Time>12:22 PM</Activity.Time>
          </Activity.Content>
        </Activity.Item>

        {/* `request` event */}
        <Activity.Item>
          <Activity.Content>
            <Activity.Avatar>
              <CallMade />
            </Activity.Avatar>

            <Text>
              <strong>nlemmon86</strong> made a request to the <strong>Templates</strong> service.
              <Activity.ViewMore />
            </Text>

            <Activity.Time>12:22 PM</Activity.Time>
          </Activity.Content>
        </Activity.Item>

        {/* `pageview` event */}
        <Activity.Item>
          <Activity.Content>
            <Activity.Avatar>
              <Streetview />
            </Activity.Avatar>

            <Text>
              <strong>nlemmon86</strong> viewed the <strong>Events</strong> page.
              <Activity.ViewMore />
            </Text>

            <Activity.Time>12:22 PM</Activity.Time>
          </Activity.Content>
        </Activity.Item>

        {/* `change` event */}
        <Activity.Item>
          <Activity.Content>
            <Activity.Avatar>
              <ChangeHistory />
            </Activity.Avatar>

            <Text>
              <strong>nlemmon86</strong> changed their <strong>password</strong>.
              <Activity.ViewMore />
            </Text>

            <Activity.Time>12:22 PM</Activity.Time>
          </Activity.Content>
        </Activity.Item>

        {/* `login` event */}
        <Activity.Item>
          <Activity.Content>
            <Activity.Avatar>
              <OpenInBrowser />
            </Activity.Avatar>

            <Text>
              <strong>nlemmon86</strong> logged in.
              <Activity.ViewMore />
            </Text>

            <Activity.Time>12:22 PM</Activity.Time>
          </Activity.Content>
        </Activity.Item>

        <Activity.Date>June 09</Activity.Date>

        {/* `login` event */}
        <Activity.Item>
          <Activity.Content>
            <Activity.Avatar>
              <OpenInBrowser />
            </Activity.Avatar>

            <Text>
              <strong>nlemmon86</strong> logged in.
              <Activity.ViewMore />
            </Text>

            <Activity.Time>12:22 PM</Activity.Time>
          </Activity.Content>
        </Activity.Item>
      </Activity>

      <Modal open={isModalOpen} showCloseButton={true} onClose={() => setModalOpen(false)}>
        <Panel title="Activity Event Details">
          <Panel.Section>
            <p>Here are some event details</p>
          </Panel.Section>

          <Panel.Section>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Got it.
            </Button>
          </Panel.Section>
        </Panel>
      </Modal>
    </>
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
