import React, { Component } from 'react';
import { Panel, Toggle } from '@sparkpost/matchbox';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import { setAccountOption } from 'src/actions/account';
import { connect } from 'react-redux';
import styles from './UIOptionsPanel.module.scss';

export class UIOptionsPanel extends Component {

  setUIOption = () => {
    const { setAccountOption, hideTermSubEnabled } = this.props;
    setAccountOption('hideTerminatedSubaccounts', !hideTermSubEnabled);
  };

  render() {
    const { hideTermSubEnabled, loading } = this.props;

    return (
      <Panel title='Account Options'>
        <Panel.Section>
          <LabelledValue label='Hide Subacounts'>
            <div className={styles.ToggleRow}>
              <div>
                Hide terminated subacounts. Resources associated with terminated subaccounts can still be accessed.
              </div>
              <div>
                <Toggle
                  id="hideTerminatedSubaccounts"
                  checked={hideTermSubEnabled}
                  disabled={loading}
                  onChange={this.setUIOption}
                />
              </div>
            </div>
          </LabelledValue>
        </Panel.Section>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({
  hideTermSubEnabled: selectCondition(isAccountUiOptionSet('hideTerminatedSubaccounts'))(state),
  loading: state.account.updateLoading
});

export default connect(mapStateToProps, { setAccountOption })(UIOptionsPanel);
