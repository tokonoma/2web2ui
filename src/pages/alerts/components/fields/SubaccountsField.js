import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import ComboBoxTypeaheadWrapper from 'src/components/reduxFormWrappers/ComboBoxTypeaheadWrapper';
import { getSubaccounts, hasSubaccounts } from 'src/selectors/subaccounts';
import { list as listSubaccounts } from 'src/actions/subaccounts';
import { FORM_NAME } from '../../constants/formConstants';

const itemToString = (item) => (item ? item.id > 0 ? `${item.name} (${item.id})` : `${item.name}` : '');
const selectedMap = (item) => item.id;

export class SubaccountsField extends Component {

  componentDidMount() {
    const { hasSubaccounts, listSubaccounts } = this.props;
    if (hasSubaccounts) {
      listSubaccounts();
    }
  }

  getSubaccountOptions = () => {
    const { subaccountsFieldValue, subaccounts } = this.props;
    return (subaccountsFieldValue.length > 0)
      ? (subaccountsFieldValue[0] < 0)
        ? []
        : [{ id: 0, name: 'Master account' },
          ...subaccounts]
      : [
        { id: -1, name: 'Master and all subaccounts' },
        { id: -2, name: 'Any subaccount' },
        { id: 0, name: 'Master account' },
        ...subaccounts
      ];
  };

  render() {
    const { disabled } = this.props;


    return (
      <Field
        name='subaccounts'
        component={ComboBoxTypeaheadWrapper}
        results={this.getSubaccountOptions()}
        itemToString={itemToString}
        selectedMap={selectedMap}
        disabled={disabled}
        placeholder='Type To Search'
        label='Subaccounts'
      />
    );
  }
}

const mapStateToProps = (state) => {
  const selector = formValueSelector(FORM_NAME);

  return {
    hasSubaccounts: hasSubaccounts(state),
    subaccounts: getSubaccounts(state) || [],
    subaccountsFieldValue: selector(state, 'subaccounts') || []
  };
};

export default connect(mapStateToProps, { listSubaccounts })(SubaccountsField);
