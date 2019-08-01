import React, { Component } from 'react';
import { Panel, Toggle } from '@sparkpost/matchbox';
import LabelledValue from 'src/components/labelledValue/LabelledValue';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import { setAccountOption } from 'src/actions/account';
import { connect } from 'react-redux';
import styles from './UIOptionsPanel.module.scss';

const OPTIONS = [
  {
    key: 'hideTerminatedSubaccounts',
    label: 'Hide Subaccounts',
    description: 'Hide terminated subaccounts. Resources associated with terminated subaccounts can still be accessed.'
  }
];


export class UIOptionsPanel extends Component {

  setUIOption = (key, value) => {
    this.props.setAccountOption(key, value);
  };

  render() {
    const { loading, uiOptions } = this.props;

    return (
      <Panel title='Account Options'>
        <Panel.Section>
          {uiOptions.map(({ label, description, value, key }) => (
            <LabelledValue label={label} key={`ui-option-${key}`}>
              <div className={styles.ToggleRow}>
                <div>
                  {description}
                </div>
                <div>
                  <Toggle
                    id={key}
                    checked={value}
                    disabled={loading}
                    onChange={() => this.setUIOption(key, !value)}
                  />
                </div>
              </div>
            </LabelledValue>
          ))}
        </Panel.Section>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  const uiOptions = OPTIONS.map((option) => {
    option.value = selectCondition(isAccountUiOptionSet(option.key))(state);
    return option;
  });
  return {
    uiOptions,
    loading: state.account.updateLoading
  };
};

export default connect(mapStateToProps, { setAccountOption })(UIOptionsPanel);
