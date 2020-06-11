import React from 'react';
import { ChevronRight } from '@sparkpost/matchbox-icons';
import { Stack, Text } from 'src/components/matchbox';
import { ButtonLink } from 'src/components/links';
import {
  ActivityWrapper,
  ItemWrapper,
  AvatarWrapper,
  DateWrapper,
  DateBorder,
  DateValue,
  Content,
  TimeWrapper,
} from './ActivityStyles';

/* TODO
 * [] Incorporate `prop-types`
 */

function Activity({ children }) {
  return (
    <ActivityWrapper role="list">
      <Stack space="700">{children}</Stack>
    </ActivityWrapper>
  );
}

function Avatar({ children, hasConnector }) {
  return <AvatarWrapper hasConnector={hasConnector}>{children}</AvatarWrapper>;
}

function Item(props) {
  const { children } = props;

  return <ItemWrapper role="listitem">{children}</ItemWrapper>;
}

function ViewDetails(props) {
  const { onClick } = props;

  return (
    <ButtonLink style={{ textDecoration: 'none' }} onClick={onClick} ml="200" textDecoration="none">
      <span>View&nbsp;Details</span>
      <ChevronRight size={18} />
    </ButtonLink>
  );
}

// `Date` is a reserved word!
function EventDate({ children }) {
  return (
    <DateWrapper>
      <DateValue>{children}</DateValue>

      <DateBorder />
    </DateWrapper>
  );
}

function Time({ children }) {
  return (
    <TimeWrapper>
      <Text color="gray.600" textAlign="right">
        {children}
      </Text>
    </TimeWrapper>
  );
}

Item.displayName = 'Activity.Item';
Activity.Item = Item;
Avatar.displayName = 'Activity.Avatar';
Activity.Avatar = Avatar;
ViewDetails.displayName = 'Activity.ViewDetails';
Activity.ViewDetails = ViewDetails;
Time.displayName = 'Activity.Time';
Activity.Time = Time;
Content.displayName = 'Content';
Activity.Content = Content;
EventDate.displayName = 'Activity.Date';
Activity.Date = EventDate;

export default Activity;
