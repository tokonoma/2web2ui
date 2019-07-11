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

  getAllAvailableSubaccounts = () => [
    { id: -1, name: 'Master and all subaccounts' },
    { id: -2, name: 'Any subaccount' },
    { id: 0, name: 'Master account' },
    ...this.props.subaccounts
  ];

  /*
  If the field is empty/pristine, show all options.
  If the user has already entered master & all or entered any subaccount, do no show any options
  If the user has already entered another subaccount, do not how master & all, nor any subaccount
   */
  getSubaccountOptions = () => {
    const { subaccountsFieldValue, subaccounts } = this.props;

    if (subaccountsFieldValue.length === 0) {
      return this.getAllAvailableSubaccounts();
    }

    return (subaccountsFieldValue[0] < 0)
      ? []
      : [{ id: 0, name: 'Master account' },
        ...subaccounts];
  };

  render() {
    const { disabled, subaccountsFieldValue } = this.props;
    //Maps from an array of subaccount ids to an array of full subaccount objects
    const selectedSubaccounts = subaccountsFieldValue.map((subaccountId) =>
      this.getAllAvailableSubaccounts().find(({ id }) => id === subaccountId));

    return (
      <Field
        name='subaccounts'
        component={ComboBoxTypeaheadWrapper}
        results={this.getSubaccountOptions()}
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
