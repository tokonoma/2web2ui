import React, { Component } from 'react';
import { Grid, Panel, Toggle } from 'src/components/matchbox';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import { setAccountOption } from 'src/actions/account';
import { connect } from 'react-redux';

const OPTIONS = [
  {
    key: 'hideTerminatedSubaccounts',
    label: 'Hide Subaccounts',
    description:
      'Hide terminated subaccounts. Resources associated with terminated subaccounts can still be accessed.',
  },
];

export class UIOptionsPanel extends Component {
  setUIOption = (key, value) => {
    this.props.setAccountOption(key, value);
  };

  render() {
    const { loading, uiOptions } = this.props;

    return (
      <Panel title="Account Options">
        <Panel.Section>
          {uiOptions.map(({ label, description, value, key }) => (
            <Grid key={`ui-option-${key}`}>
              <Grid.Column xs={12} md={10}>
                <LabelledValue label={label}>{description}</LabelledValue>
              </Grid.Column>
              <Grid.Column xs={12} md={2} style={{ textAlign: 'right' }}>
                <Toggle
                  id={key}
                  checked={value}
                  disabled={loading}
                  onChange={() => this.setUIOption(key, !value)}
                />
              </Grid.Column>
            </Grid>
          ))}
        </Panel.Section>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  const uiOptions = OPTIONS.map(option => {
    option.value = selectCondition(isAccountUiOptionSet(option.key))(state);
    return option;
  });
  return {
    uiOptions,
    loading: state.account.updateLoading,
  };
};

export default connect(mapStateToProps, { setAccountOption })(UIOptionsPanel);
