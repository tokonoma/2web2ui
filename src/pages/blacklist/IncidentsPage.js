import React from 'react';
import { Page } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import { Link } from 'react-router-dom';
import { Loading } from 'src/components';

export const IncidentsPage = (props) => {

  const { loading } = props;

  if (loading) {
    return <Loading/>;
  }

  return (
    <Page
      empty={{
        show: true,
        title: 'Blacklist Reports',
        image: Users,
        content: <p>Loren Ipsum</p>
      }}
      title='Blacklist'
      primaryAction={{ content: 'Add to Watch List', to: '/blacklist', component: Link }}
    >
    </Page>
  );

};
export default (IncidentsPage);
