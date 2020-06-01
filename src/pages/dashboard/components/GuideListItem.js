import React from 'react';
import {
  RadioButtonUnchecked,
  CheckCircleOutline,
  CheckBoxOutlineBlank,
  CheckBox,
} from '@sparkpost/matchbox-icons';
import { Button, Box } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { tokens } from '@sparkpost/design-tokens-hibana';
import styles from './GuideListItem.module.scss';

export const HibanaGuideListItem = ({
  itemCompleted,
  children,
  action: { name, key = name, onClick, to, external },
}) => (
  <Box display="flex">
    <Box>
      {itemCompleted ? (
        <CheckBox size={20} color={tokens.color_blue_700} />
      ) : (
        <CheckBoxOutlineBlank size={20} />
      )}
    </Box>
    <Box pl="200" flexGrow="1">
      {children}
    </Box>
    <Box ml="200">
      <Button
        onClick={onClick}
        variant={itemCompleted ? 'monochrome-secondary' : 'secondary'}
        data-id={key}
        to={to}
        external={external}
      >
        {name}
      </Button>
    </Box>
  </Box>
);

export const OGGuideListItem = ({
  itemCompleted,
  children,
  action: { name, key = name, onClick, to, external },
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
        data-id={key}
        to={to}
        external={external}
      >
        {name}
      </Button>
    </div>
  </div>
);

export function GuideListItem(props) {
  return useHibanaToggle(OGGuideListItem, HibanaGuideListItem)(props);
}

export const GuideListItemTitle = ({ children }) => (
  <div className={styles.GuideListItem}>{children}</div>
);

export const GuideListItemDescription = ({ children }) => (
  <div className={styles.GuideListItemDescription}>{children}</div>
);
