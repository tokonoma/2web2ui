/* eslint-disable max-lines */

import React, { useState } from 'react';
import { Button, Page, Panel } from '@sparkpost/matchbox';
import { minLength, required } from 'src/helpers/validation';
import { TextFieldWrapper, ToggleBlockWrapper } from 'src/components/hooksFormWrapper';

export const useForm = () => {
  const [values, setValues] = useState({});

  const handleSubmit = (callback) => (e) => {
    if (e) {
      e.preventDefault();
    }

    return callback(values);
  };

  const handleValueChange = (name, value) => { //todo support nested names like content.from.email
    setValues({ ...values, [name]: value });
  };


  return {
    handleSubmit,
    handleValueChange
  };
};


const SettingsForm = (props) => {
  const { handleSubmit, handleValueChange } = useForm();

  const onSubmit = (data) => {
    // console.log('parent submit handler', data);
  };

  const parseToggle = (value) => !!value;

  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Panel.Section>
        <TextFieldWrapper
          name='name'
          label='Name'
          validate={[required, minLength(4)]}
          onChange={handleValueChange}
        />

        <TextFieldWrapper
          name='id'
          label='Template ID'
          validate={required}
          onChange={handleValueChange}
        />

        <TextFieldWrapper
          name='subject'
          label='Subject'
          validate={required}
          onChange={handleValueChange}
        />


        <ToggleBlockWrapper
          name='transactional'
          label='Transactional'
          type='checkbox'
          parse={parseToggle}
          onChange={handleValueChange}
          helpText={<p>Transactional messages are triggered by a user’s actions on the
            website, like requesting a password reset, signing up, or making a purchase.</p>}
        />

        {/*<TextField name='id' label='Identifier' onChange={handleValueChange} value={values.id}/>*/}


        {/*<Field*/}
        {/*name='options.transactional'*/}
        {/*component={ToggleBlock}*/}
        {/*label='Transactional'*/}
        {/*type='checkbox'*/}
        {/*// parse={this.parseToggle}*/}
        {/*helpText={<span className={styles.HelpText}>Transactional messages are triggered by a user’s actions on the*/}
        {/*website, like requesting a password reset, signing up, or making a purchase.</span>}*/}
        {/*disabled={readOnly}*/}
        {/*/>*/}

      </Panel.Section>

      {/*<SubaccountSection newTemplate={newTemplate} disabled={readOnly}/>*/}

      {/*<Panel.Section>*/}
      {/*<Field*/}
      {/*name='content.subject'*/}
      {/*component={TextFieldWrapper}*/}
      {/*label='Subject'*/}
      {/*disabled={readOnly}*/}
      {/*validate={required}*/}
      {/*/>*/}

      {/*<Field*/}
      {/*name='content.from.email'*/}
      {/*component={FromEmailWrapper}*/}
      {/*placeholder='example@email.com'*/}
      {/*label='From Email'*/}
      {/*disabled={readOnly}*/}
      {/*validate={[required, emailOrSubstitution]}*/}
      {/*domains={domains}*/}
      {/*helpText={fromEmailHelpText}*/}
      {/*/>*/}

      {/*<Field*/}
      {/*name='content.from.name'*/}
      {/*component={TextFieldWrapper}*/}
      {/*label='From Name'*/}
      {/*helpText='A friendly from for your recipients.'*/}
      {/*disabled={readOnly}*/}
      {/*/>*/}

      {/*<Field*/}
      {/*name='content.reply_to'*/}
      {/*component={TextFieldWrapper}*/}
      {/*label='Reply To'*/}
      {/*helpText='An email address recipients can reply to.'*/}
      {/*disabled={readOnly}*/}
      {/*validate={emailOrSubstitution}*/}
      {/*/>*/}

      {/*<Field*/}
      {/*name='description'*/}
      {/*component={TextFieldWrapper}*/}
      {/*label='Description'*/}
      {/*helpText='Not visible to recipients.'*/}
      {/*disabled={readOnly}*/}
      {/*/>*/}
      {/*</Panel.Section>*/}
      {/*<Panel.Section>*/}
      {/*<Field*/}
      {/*name='options.open_tracking'*/}
      {/*component={ToggleBlock}*/}
      {/*label='Track Opens'*/}
      {/*type='checkbox'*/}
      {/*// parse={this.parseToggle}*/}
      {/*disabled={readOnly}*/}
      {/*/>*/}

      {/*<Field*/}
      {/*name='options.click_tracking'*/}
      {/*component={ToggleBlock}*/}
      {/*label='Track Clicks'*/}
      {/*type='checkbox'*/}
      {/*// parse={this.parseToggle}*/}
      {/*disabled={readOnly}*/}
      {/*/>*/}
      {/*<Field*/}
      {/*name='options.transactional'*/}
      {/*component={ToggleBlock}*/}
      {/*label='Transactional'*/}
      {/*type='checkbox'*/}
      {/*// parse={this.parseToggle}*/}
      {/*helpText={<p className={styles.HelpText}>Transactional messages are triggered by a user’s actions on the*/}
      {/*website, like requesting a password reset, signing up, or making a purchase.</p>}*/}
      {/*disabled={readOnly}*/}
      {/*/>*/}
      {/*</Panel.Section>*/}
      <Panel.Section>
        <Button
          type='submit'
          // disabled={isDraftUpdating}
          // onClick={() => { updateDraft({ id: draft.id, content }, draft.subaccount_id); }}
          primary
        >
          Update Settings
        </Button>
        <Button
          // disabled={isDraftUpdating}
          // onClick={() => { updateDraft({ id: draft.id, content }, draft.subaccount_id); }}
        >
          Delete Template
        </Button>

      </Panel.Section>
    </form>
  </>);
};


export class SettingsHooks extends React.Component {

  render() {
    return (
      <Page>
        <Panel>
          <SettingsForm/>
        </Panel>
      </Page>);
  }
}


export default SettingsHooks;

//todo hydrate form with existing data
//todo validate on submission (ref -> value didn't work)
//todo support nested field name (option.transactional)
//todo disable submit button when form is not ready (invalid, pristine, submitting)
