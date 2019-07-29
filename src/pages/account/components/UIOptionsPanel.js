import React, { Component } from 'react';
import { Panel, Toggle, Grid } from '@sparkpost/matchbox';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import { update as updateAccount } from 'src/actions/account';
import { connect } from 'react-redux';

export class UIOptionsPanel extends Component {


  setUIOption = () => {
    const { updateAccount, hideTermSubEnabled } = this.props;
    const body = {
      options: {
        ui: {
          hideTerminatedSubaccounts: !hideTermSubEnabled
        }
      }
    };
    updateAccount(body);
  };

  render() {
    const { hideTermSubEnabled, loading } = this.props;

    return (
      <Panel title='Account Options'>
        <Panel.Section>
          <Grid>
            <Grid.Column xs={11}>
              <LabelledValue label='Hide Subacounts'>
                <p>Hide terminated subacounts. Resources associated with terminated subaccounts can still be accessed.</p>
              </LabelledValue>
            </Grid.Column>
            <Grid.Column xs={1}>
              <Toggle
                id="hideTerminatedSubaccounts"
                checked={hideTermSubEnabled}
                disabled={loading}
                onChange={this.setUIOption}
              />
            </Grid.Column>
          </Grid>
        </Panel.Section>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({
  hideTermSubEnabled: selectCondition(isAccountUiOptionSet('hideTerminatedSubaccounts'))(state),
  loading: state.account.updateLoading
});

export default connect(mapStateToProps, { updateAccount })(UIOptionsPanel);
