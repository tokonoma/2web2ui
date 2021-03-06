import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import PropTypes from 'prop-types';

import { Grid, Stack } from 'src/components/matchbox';
import { TextFieldWrapper, SelectWrapper } from 'src/components';
import { required } from 'src/helpers/validation';
import { getZipLabel } from 'src/helpers/billing';
import { getFirstStateForCountry } from 'src/selectors/accountBillingForms';

import styles from './BillingAddressForm.module.scss';
import _ from 'lodash';

/**
 * This component will register the following redux-form fields
 * billingAddress.firstName
 * billingAddress.lastName
 * billingAddress.country
 * billingAddress.state (if country US | CA)
 * billingAddress.zip
 */
export class BillingAddressForm extends Component {
  state = {
    showName: true,
  };

  componentDidMount() {
    const { firstName, lastName } = this.props;

    // Hide name fields if we already have them
    // Their values are still in the redux-form store although the fields are hidden
    if (firstName && lastName) {
      this.setState({ showName: false });
    }
  }

  componentDidUpdate({ countryValue: prevCountry }) {
    const { countryValue, change, formName, firstState } = this.props;

    // Handles billingAddress.state field mutation when country changes
    if (prevCountry !== countryValue) {
      if (countryValue === 'US' || countryValue === 'CA') {
        // Sets first state value
        change(formName, 'billingAddress.state', firstState);
      } else {
        // Removes state value from store
        change(formName, 'billingAddress.state', null);
      }
    }
  }

  render() {
    const { countries = [], countryValue, disabled } = this.props;

    const stateOrProvince =
      countries.length && (countryValue === 'US' || countryValue === 'CA') ? (
        <Grid.Column xs={6}>
          <Field
            label={countryValue === 'US' ? 'State' : 'Province'}
            name="billingAddress.state"
            placeholder={`Select a ${countryValue === 'US' ? 'State' : 'Province'}`}
            component={SelectWrapper}
            options={_.find(countries, { value: countryValue }).states}
            validate={required}
            disabled={disabled}
          />
        </Grid.Column>
      ) : null;

    const nameFields = this.state.showName ? (
      <Grid className={styles.spacer}>
        <Grid.Column xs={6}>
          <Field
            label="First Name"
            name="billingAddress.firstName"
            component={TextFieldWrapper}
            validate={required}
            disabled={disabled}
          />
        </Grid.Column>
        <Grid.Column xs={6}>
          <Field
            label="Last Name"
            name="billingAddress.lastName"
            component={TextFieldWrapper}
            validate={required}
            disabled={disabled}
          />
        </Grid.Column>
      </Grid>
    ) : null;

    return (
      <div>
        <Stack>
          <p>Billing Address</p>
          {nameFields}
          <Field
            label="Country"
            name="billingAddress.country"
            placeholder="Select a country"
            component={SelectWrapper}
            options={countries}
            validate={required}
            disabled={disabled}
          />
          <Grid>
            {stateOrProvince}
            <Grid.Column xs={6}>
              <Field
                label={getZipLabel(countryValue)}
                name="billingAddress.zip"
                component={TextFieldWrapper}
                validate={required}
                disabled={disabled}
              />
            </Grid.Column>
          </Grid>
        </Stack>
      </div>
    );
  }
}

BillingAddressForm.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  countryValue: PropTypes.string,
  formName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { formName }) => {
  // Get country value from state
  const selector = formValueSelector(formName);
  const countryValue = selector(state, 'billingAddress.country');

  return {
    countryValue,
    firstName: selector(state, 'billingAddress.firstName'),
    lastName: selector(state, 'billingAddress.lastName'),
    firstState: getFirstStateForCountry(state, countryValue),
  };
};
export default connect(mapStateToProps, { change })(BillingAddressForm);
