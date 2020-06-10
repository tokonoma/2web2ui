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

function Activity({ children }) {
  return (
    <ActivityWrapper role="list">
      <Stack space="700">{children}</Stack>
    </ActivityWrapper>
  );
}

function Avatar({ children }) {
  return <AvatarWrapper>{children}</AvatarWrapper>;
}

function Item(props) {
  const { children } = props;

  return <ItemWrapper role="listitem">{children}</ItemWrapper>;
}

function ViewMore(props) {
  const { onClick } = props;

  return (
    <ButtonLink style={{ textDecoration: 'none' }} onClick={onClick} ml="200" textDecoration="none">
      <span>View&nbsp;More</span>
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
ViewMore.displayName = 'Activity.ViewMore';
Activity.ViewMore = ViewMore;
Time.displayName = 'Activity.Time';
Activity.Time = Time;
Content.displayName = 'Content';
Activity.Content = Content;
EventDate.displayName = 'Activity.Date';
Activity.Date = EventDate;

export default Activity;
