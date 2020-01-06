import React from 'react';
import { RadioButtonUnchecked, CheckCircleOutline } from '@sparkpost/matchbox-icons';
import { Button } from '@sparkpost/matchbox';
import styles from './GuideListItem.module.scss';
export const GuideListItem = ({
  itemCompleted,
  children,
  action: { name, onClick, to, external },
}) => (
  <div className={styles.GuideListItemContainer}>
    <div className={styles.CheckBoxContainer}>
      {itemCompleted ? (
        <CheckCircleOutline size={36} className={styles.CheckCircleIcon} />
      ) : (
        <RadioButtonUnchecked size={36} />
      )}
    </div>
    <div className={styles.ListItemContainer}>{children}</div>
    <div className={styles.ListActionContainer}>
      <Button
        onClick={onClick}
        color={(!itemCompleted && 'orange') || null}
        outline={itemCompleted}
        data-id={name}
        to={to}
        external={external}
      >
        {' '}
        {name}{' '}
      </Button>
    </div>
  </div>
);

export const GuideListItemTitle = ({ children }) => (
  <div className={styles.GuideListItem}>{children}</div>
);

export const GuideListItemDescription = ({ children }) => (
  <div className={styles.GuideListItemDescription}>{children}</div>
);
