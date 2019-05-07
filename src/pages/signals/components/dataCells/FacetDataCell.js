import React from 'react';
import PageLink from 'src/components/pageLink';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { MAILBOX_PROVIDERS } from 'src/constants';
import styles from './DataCell.module.scss';
import classnames from 'classnames';

const FacetDataCell = ({ dimension, facet, id, name, subaccountId, truncate }) => {

  //This is the default case for the label. The switch statements below are for special cases.
  let label = (name) ? `${name} (${id})` : id;
  switch (facet) {
    case 'sid':
      if (id === -1) {
        return (
          <div className={classnames(styles.PaddedCell, truncate && styles.OverflowCell)}>
            Master & All Subaccounts
          </div>
        );
      } else if (id === 0) {
        label = 'Master Account';
      }
      break;
    case 'mb_provider':
      label = MAILBOX_PROVIDERS[id];
  }

  const search = (subaccountId >= 0) ? setSubaccountQuery(subaccountId) : undefined;

  return (
    <div className={classnames(styles.PaddedCell, truncate && styles.OverflowCell)}>
      <PageLink
        children={label}
        to={{
          pathname: `/signals/${dimension}/${facet}/${id}`,
          search
        }}
      />
    </div>
  );
};

export default FacetDataCell;
