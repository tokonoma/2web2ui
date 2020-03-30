import React from 'react';
import { snakeToFriendly } from 'src/helpers/string';
import { PageLink } from 'src/components/links';
import { Tag } from 'src/components/matchbox';

const statusTagColors = {
  active: null,
  suspended: 'yellow',
  terminated: 'red',
};

/*
 Subaccounts getRowData passed to TableCollection in ListPage.
*/
const getRowData = ({ status, id, name }) => [
  <PageLink to={`/account/subaccounts/${id}`}>{name}</PageLink>,
  <p>{id}</p>,
  <Tag color={statusTagColors[status]}>{snakeToFriendly(status)}</Tag>,
];

export default getRowData;
