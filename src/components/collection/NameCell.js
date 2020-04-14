import React from 'react';
import { PageLink } from 'src/components/links';
import { Text } from 'src/components/matchbox';
import { slugToFriendly } from 'src/helpers/string';
import styles from './NameCell.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

const OGNameCell = ({
  id,
  name = slugToFriendly(id), // this default is an edge case, most resources will include a name
  to,
}) => [
  <p className={styles.Name} key="name">
    <PageLink to={to}>{name}</PageLink>
  </p>,
  <p className={styles.Id} key="id">
    ID: {id}
  </p>,
];

const HibanaNameCell = ({
  id,
  name = slugToFriendly(id), // this default is an edge case, most resources will include a name
  to,
}) => [
  <Text key="name">
    <PageLink to={to}>{name}</PageLink>
  </Text>,
  <Text key="id">ID: {id}</Text>,
];

const NameCell = props => {
  return useHibanaToggle(OGNameCell, HibanaNameCell)(props);
};

export default NameCell;
