import React from 'react';
import { RadioButtonUnchecked, CheckCircleOutline } from '@sparkpost/matchbox-icons';
import { Button, Grid } from '@sparkpost/matchbox';
import styles from './GuideListItem.module.scss';
export const GuideListItem = ({ itemCompleted, children, action: { name, onClick }}) => (
  <Grid>
    <Grid.Column md={9} xs={12}>
      <div className={styles.CheckBoxContainer}>
        {itemCompleted ? <CheckCircleOutline size={36} className={styles.CheckCircleIcon}/> : <RadioButtonUnchecked size={36}/>}
      </div>
      <div className={styles.ListItemContainer}>
        {children}
      </div>
    </Grid.Column>
    <Grid.Column md={3} xs={12}>
      <div className={styles.ListActionContainer}>
        <Button onClick={onClick} color={!itemCompleted && 'orange'}> {name} </Button>
      </div>
    </Grid.Column>
  </Grid>
);

export const GuideListItemTitle = ({ children }) => (
  <div className={styles.GuideListItem}>
    {children}
  </div>
);

export const GuideListItemDescription = ({ children }) => (
  <div className={styles.GuideListItemDescription}>
    {children}
  </div>
);
