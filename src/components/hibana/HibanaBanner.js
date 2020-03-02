import React from 'react';
import { connect } from 'react-redux';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import styles from './HibanaComponents.module.scss';

function HibanaBanner({ children, hasThemeControls }) {
  if (hasThemeControls) {
    return (
      <div data-id="hibana-controls" className={styles.HibanaBanner}>
        <div className={styles.HibanaBannerSubsection}>{children}</div>
      </div>
    );
  }

  return null;
}

const mapStateToProps = state => {
  return {
    hasThemeControls: selectCondition(isAccountUiOptionSet('hibana.hasThemeControls'))(state),
  };
};

export default connect(mapStateToProps, {})(HibanaBanner);
