import React from 'react';
import { Grid } from '@sparkpost/matchbox';
import styles from './InfoBlock.module.scss';

const InfoBlock = ({ label, value, columnProps = {}, labelClassName, valueClassName }) => <Grid.Column {...columnProps}>
  <div className={labelClassName || styles.InfoLabel}>{label}</div>
  <div className={valueClassName || styles.InfoValue}>{value}</div>
</Grid.Column>;

export default InfoBlock;
