import React from 'react';
import { Grid } from '@sparkpost/matchbox';
import EditSection from './EditSection';
import PreviewSection from './PreviewSection';
import styles from './EditContents.module.scss';

const EditContents = () => (
  <Grid className={styles.EditContents}>
    <Grid.Column sm={12} md={12} lg={6}>
      <EditSection />
    </Grid.Column>
    <Grid.Column sm={12} md={12} lg={6}>
      <PreviewSection />
    </Grid.Column>
  </Grid>
);

export default EditContents;
