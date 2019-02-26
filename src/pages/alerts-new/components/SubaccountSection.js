// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { formValueSelector, change } from 'redux-form';
// import PropTypes from 'prop-types';
// import { Field } from 'redux-form';
// import { RadioGroup, SubaccountTypeaheadWrapper, TextFieldWrapper } from 'src/components';
// import { required } from 'src/helpers/validation';
// import { getSubaccount } from 'src/selectors/subaccounts';

// const createOptions = [
//   { label: 'Master and all subaccounts', value: 'all' },
//   { label: 'Master account only', value: 'master' },
//   { label: 'Single Subaccount', value: 'subaccount' }
// ];

// /**
//  * Component produces the follow redux form fields
//  * If newAlert
//  * - assignTo 'master' | 'all' | 'subaccount'
//  * - subaccount if assignTo === 'subaccount'
//  *
//  * If !newAlert
//  * - subaccount TextField | typeahead (disabled)
//  */
// export class SubaccountSection extends Component {
//   componentDidUpdate(prevProps) {
//     const { assignTo, formName, change } = this.props;

//     // Clear subaccount value if switching away from subaccount
//     if (assignTo !== 'subaccount' && prevProps.assignTo === 'subaccount') {
//       change(formName, 'subaccount', null);
//     }
//   }

//   // renderEdit() {
//   //   const { subaccount } = this.props;
//   //   let component = SubaccountTypeaheadWrapper;

//   //   // On 'master only' or 'master and all' alerts
//   //   if (typeof subaccount === 'string') {
//   //     component = TextFieldWrapper;
//   //   }

//   //   return (
//   //     <Field
//   //       component={component}
//   //       label='Account'
//   //       name='subaccount'
//   //       helpText='This assignment is permanent.'
//   //       disabled />
//   //   );
//   // }

//   render() {
//     const { assignTo, subaccount } = this.props;

//     // On 'master only' or 'master and all' alerts
//     if (typeof subaccount === 'string') {
//       component = TextFieldWrapper;
//     }

//     const typeahead = assignTo === 'subaccount'
//       ? <Field name='alert_subaccount' component={SubaccountTypeaheadWrapper} validate={required} />
//       : null;

//     return (
//       <div>
//         <Field
//           component={RadioGroup}
//           label='Account'
//           name='assignTo'
//           options={createOptions} />
//         {typeahead}
//       </div>
//     );
//   }
// }

// SubaccountSection.propTypes = {
//   assignTo: PropTypes.oneOf(['master', 'all', 'subaccount']),
//   change: PropTypes.func
// };

// const mapStateToProps = (state, props) => {
//   const selector = formValueSelector(props.formName);
//   return {
//     assignTo: selector(state, 'assignTo'),
//     subaccount: getSubaccount(selector(state, 'alert_subaccount'))
//   };
// };

// export default connect(mapStateToProps, { change })(SubaccountSection);
