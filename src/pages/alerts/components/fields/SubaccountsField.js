import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import ComboBoxTypeaheadWrapper from 'src/components/reduxFormWrappers/ComboBoxTypeaheadWrapper';
import { getSubaccounts } from 'src/selectors/subaccounts';
import { list as listSubaccounts } from 'src/actions/subaccounts';
import { FORM_NAME } from '../../constants/formConstants';

const subaccountToString = (subaccount) => {
  if (!subaccount) {
    return '';
  }
  return subaccount.id > 0 ? `${subaccount.name} (${subaccount.id})` : subaccount.name;
};

const subaccountMap = (item) => item.id;

export class SubaccountsField extends Component {
  componentDidMount() {
    this.props.listSubaccounts();
  }

  render() {
    const { disabled, subaccounts, subaccountsFieldValue } = this.props;
    const subaccountItems = [
      { id: -1, name: 'Master and all subaccounts', isExclusiveItem: true },
      { id: -2, name: 'Any subaccount', isExclusiveItem: true },
      { id: 0, name: 'Master account' },
      ...subaccounts
    ];

    //Maps from an array of subaccount ids to an array of full subaccount objects
    const selectedSubaccounts = subaccountsFieldValue.map((subaccountId) =>
      /*Find the correct subaccount object within all available subaccounts. If not found, return a default object with
      an id and a placeholder name.
      */
      subaccountItems.find(({ id }) => id === subaccountId) || { id: subaccountId, name: 'id:' });

    return (
      <Field
        name='subaccounts'
        component={ComboBoxTypeaheadWrapper}
        results={subaccountItems}
        itemToString={subaccountToString}
        selectedMap={subaccountMap}
        disabled={disabled}
        placeholder='Type To Search'
        defaultSelected={selectedSubaccounts}
        label='Subaccounts'
      />
    );
  }
}

const mapStateToProps = (state) => ({
  subaccounts: getSubaccounts(state) || [],
  subaccountsFieldValue: formValueSelector(FORM_NAME)(state, 'subaccounts') || []
});

export default connect(mapStateToProps, { listSubaccounts })(SubaccountsField);
