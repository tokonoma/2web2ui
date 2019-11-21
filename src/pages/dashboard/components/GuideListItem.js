import React from 'react';
import { PanoramaFishEye, CheckCircleOutline } from '@sparkpost/matchbox-icons';
import { Button, Grid } from '@sparkpost/matchbox';

export const GuideListItem = ({ itemCompleted, children, action: { name, onClick }}) => (
  <Grid>
    <Grid.Column xs={12} md={9}>
      <div style={{ display: 'inline-block' }}>
        {itemCompleted ? <CheckCircleOutline size={36}/> : <PanoramaFishEye size={36}/>}
      </div>
      <div style={{ display: 'inline-block' }}>
        {children}
      </div>
    </Grid.Column>
    <Grid.Column xs={12} md={3}>
      <div style={{ float: 'right' }}>
        <Button onClick={onClick} color={!itemCompleted && 'orange'}> {name} </Button>
      </div>
    </Grid.Column>
  </Grid>
);

export const GuideListItemTitle = ({ children }) => (
  <div>
    {children}
  </div>
);

export const GuideListItemDescription = ({ children }) => (
  <div>
    {children}
  </div>
);
