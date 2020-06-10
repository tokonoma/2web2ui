import React from 'react';
import {
  CallMade,
  ChangeHistory,
  Mouse,
  OpenInBrowser,
  Streetview,
} from '@sparkpost/matchbox-icons';
import { Text } from 'src/components/matchbox';
import { Activity } from 'src/components/activity';

export default function ActivityList() {
  return (
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
            <Activity.ViewMore />
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
  );
}
