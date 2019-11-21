import React from 'react';
import { RadioButtonUnchecked, CheckCircleOutline } from '@sparkpost/matchbox-icons';
import { Button, Grid } from '@sparkpost/matchbox';

export const GuideListItem = ({ itemCompleted, children, action: { name, onClick }}) => (
  <Grid>
    <Grid.Column xs={12} md={9}>
      <Grid>
        <Grid.Column md={1} xs={12}>
          {itemCompleted ? <CheckCircleOutline size={36} style={{ color: 'green' }}/> : <RadioButtonUnchecked size={36}/>}
        </Grid.Column>
        <Grid.Column md={11} xs={12}>
          {children}
        </Grid.Column>
      </Grid>
    </Grid.Column>
    <Grid.Column xs={12} md={3}>
      <div style={{ float: 'right' }}>
        <Button onClick={onClick} color={!itemCompleted && 'orange'}> {name} </Button>
      </div>
    </Grid.Column>
  </Grid>
);

export const GuideListItemTitle = ({ children }) => (
  <div style={{ fontWeight: 600 }}>
    {children}
  </div>
);

export const GuideListItemDescription = ({ children }) => (
  <div style={{ paddingTop: '10px' }}>
    {children}
  </div>
);
