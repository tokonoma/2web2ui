import React from 'react';
import PageLink from 'src/components/pageLink';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { MB_PROVIDERS } from 'src/constants';
import styles from './DataCell.module.scss';
import classnames from 'classnames';

const FacetDataCell = ({ dimension, facet, id, name, subaccountId, truncate }) => {
  let label = friendlyLabel(facet, id);
  let search;

  if (facet === 'sid' && id === 0) {
    label = 'Master Account';
  }

  if (facet === 'sid' && id === -1) {
    return (
      <div className={classnames(styles.PaddedCell, truncate && styles.OverflowCell)}>
        Master & All Subaccounts
      </div>
    );
  }

  if (name) {
    label = `${name} (${id})`;
  }

  if (subaccountId >= 0) {
    search = setSubaccountQuery(subaccountId);
  }

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

const friendlyLabel = (facet, id) => {
  switch (facet) {
    case 'mb_provider':
      return MB_PROVIDERS[id];
    default:
      return id;
  }
};

export default FacetDataCell;
