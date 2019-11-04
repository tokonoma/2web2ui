/* eslint-disable max-lines */
import React from 'react';
import { Field } from 'redux-form';
import { Button, Panel } from '@sparkpost/matchbox';
import ToggleBlock from 'src/components/toggleBlock/ToggleBlock';
import SubaccountSection from 'src/components/subaccountSection';
import { TextFieldWrapper } from 'src/components';
import FromEmailWrapper from '../FromEmailWrapper';
import CopyField from 'src/components/copyField/CopyField';
import { required } from 'src/helpers/validation';
import styles from './SettingsForm.module.scss';
import { emailOrSubstitution } from '../validation';

export default class SettingsForm extends React.Component {
  updateSettings = (values = {}) => {
    const {
      draft,
      updateDraftV2,
      parsedTestData,
      subaccountId,
      showAlert,
      content,
      setHasSaved
    } = this.props;

    const { text , html } = content;

    values.content = { ...values.content , text, html };

    return updateDraftV2({
      id: draft.id,
      parsedTestData,
      ...values
    }, subaccountId)
      .then(() => {
        setHasSaved(true);
        showAlert({ type: 'success', message: 'Template settings updated.' });
      });
  };

  parseToggle = (value) => !!value;

  renderPublishedIntro = () => {
    const { hasDraft } = this.props;
    return (<Panel.Section>
      <p className={styles.SettingsIntro}>{`Template settings can only be changed in drafts. Simply select '${hasDraft ? 'Edit Draft' : 'Save as Draft'}' in the top right to access the draft version, and adjust settings as needed.`}</p>
    </Panel.Section>);
  }
  render() {
    const {
      handleSubmit,
      domainsLoading,
      domains,
      subaccountId,
      submitting,
      pristine,
      valid,
      hasSubaccounts,
      canViewSubaccount,
      isPublishedMode,
      draft
    } = this.props;
    const canViewSubaccountSection = hasSubaccounts && canViewSubaccount;
    const fromEmailHelpText = !domainsLoading && !domains.length ? (subaccountId ? 'The selected subaccount does not have any verified sending domains.' : 'You do not have any verified sending domains to use.') : null;

    return (<>
      {isPublishedMode && this.renderPublishedIntro()}
      <form onSubmit={handleSubmit(this.updateSettings)}>
        <Panel.Section>
          <Field
            name='name'
            component={TextFieldWrapper}
            label='Template Name'
            disabled={submitting || isPublishedMode}
            validate={required}
          />

          <CopyField
            name='id'
            id='template-id-field'
            label='Template ID'
            value={draft.id}
            helpText={'A Unique ID for your template, we\'ll fill this in for you.'}
            disabled={true}
          />
        </Panel.Section>
        {canViewSubaccountSection && <SubaccountSection newTemplate={false} disabled={submitting || isPublishedMode}/>}
        <Panel.Section>
          <Field
            name='content.subject'
            component={TextFieldWrapper}
            label='Subject'
            validate={required}
            disabled={submitting || isPublishedMode}
          />

          <Field
            name='content.from.email'
            component={FromEmailWrapper}
            placeholder='example@email.com'
            label='From Email'
            validate={[required, emailOrSubstitution]}
            domains={domains}
            helpText={fromEmailHelpText}
            disabled={submitting || isPublishedMode}
          />

          <Field
            name='content.from.name'
            component={TextFieldWrapper}
            label='From Name'
            helpText='A friendly from for your recipients.'
            disabled={submitting || isPublishedMode}
          />

          <Field
            name='content.reply_to'
            component={TextFieldWrapper}
            label='Reply To'
            helpText='An email address recipients can reply to.'
            validate={emailOrSubstitution}
            disabled={submitting || isPublishedMode}
          />

          <Field
            name='description'
            component={TextFieldWrapper}
            label='Description'
            helpText='Not visible to recipients.'
            disabled={submitting || isPublishedMode}
          />
        </Panel.Section>
        <Panel.Section>
          <Field
            name='options.open_tracking'
            component={ToggleBlock}
            label='Track Opens'
            type='checkbox'
            parse={this.parseToggle}
            disabled={submitting || isPublishedMode}
          />

          <Field
            name='options.click_tracking'
            component={ToggleBlock}
            label='Track Clicks'
            type='checkbox'
            parse={this.parseToggle}
            disabled={submitting || isPublishedMode}
          />
          <Field
            name='options.transactional'
            component={ToggleBlock}
            label='Transactional'
            type='checkbox'
            parse={this.parseToggle}
            helpText={<p className={styles.HelpText}>Transactional messages are triggered by a user’s actions on the
              website, like requesting a password reset, signing up, or making a purchase.</p>}
            disabled={submitting || isPublishedMode}

          />
        </Panel.Section>
        <Panel.Section>
          <Button
            type='submit'
            primary
            disabled={submitting || !valid || pristine || isPublishedMode}
          >
            Update Settings
          </Button>
        </Panel.Section>
      </form>
    </>);
  }
}
