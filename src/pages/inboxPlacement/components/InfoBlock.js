import React from 'react';
import { Grid } from '@sparkpost/matchbox';
import styles from './InfoBlock.module.scss';

const InfoBlock = ({ label, value, columnProps = {}, className }) => <Grid.Column {...columnProps}>
  <div className={className || styles.InfoLabel}>{label}</div>
  <div className={className || styles.InfoValue}>{value}</div>
</Grid.Column>;

export default InfoBlock;
