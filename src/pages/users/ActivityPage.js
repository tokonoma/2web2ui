import React from 'react';
import {
  CallMade,
  ChangeHistory,
  Mouse,
  OpenInBrowser,
  Streetview,
} from '@sparkpost/matchbox-icons';
import { Page, Panel, Text } from 'src/components/matchbox';
import { PageDescription } from 'src/components/text';
import { Activity } from 'src/components/activity';

export default function ActivityPage() {
  return (
    <Page title="User Activity">
      <PageDescription>A log of activity for users managed within your account.</PageDescription>

      <Panel>
        <Panel.Section>
          <Activity>
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

                <Activity.EventDate>Jun 10</Activity.EventDate>
              </Activity.Content>
            </Activity.Item>

            {/* `request` event */}
            <Activity.Item>
              <Activity.Content>
                <Activity.Avatar>
                  <CallMade />
                </Activity.Avatar>

                <Text>
                  <strong>nlemmon86</strong> made a request to the <strong>Templates</strong>{' '}
                  service.
                  <Activity.ViewMore />
                </Text>

                <Activity.EventDate>Jun 10</Activity.EventDate>
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

                <Activity.EventDate>Jun 10</Activity.EventDate>
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

                <Activity.EventDate>Jun 10</Activity.EventDate>
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

                <Activity.EventDate>Jun 10</Activity.EventDate>
              </Activity.Content>
            </Activity.Item>
          </Activity>
        </Panel.Section>
      </Panel>
    </Page>
  );
}
