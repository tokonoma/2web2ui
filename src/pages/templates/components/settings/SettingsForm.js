/* eslint-disable max-lines */
import React from 'react';
import { Field } from 'redux-form';
import { Button, Panel, Stack } from 'src/components/matchbox';
import { ToggleBlock } from 'src/components/toggleBlock';
import SubaccountSection from 'src/components/subaccountSection';
import { TextFieldWrapper } from 'src/components';
import FromEmailWrapper from '../FromEmailWrapper';
import CopyField from 'src/components/copyField/CopyField';
import { required } from 'src/helpers/validation';
import styles from './SettingsForm.module.scss';

export default function SettingsForm(props) {
  const updateSettings = values => {
    const {
      draft,
      updateDraft,
      parsedTestData,
      showAlert,
      content: { amp_html, html, text },
      setHasSaved,
    } = props;

    return updateDraft(
      {
        id: draft.id,
        name: values.name,
        description: values.description,
        // must include other content parts to avoid work in progress
        content: { ...values.content, amp_html, html, text },
        options: values.options,
        // this value is only editable and present when template is not assigned to a subaccount
        shared_with_subaccounts: draft.subaccount_id ? undefined : values.shared_with_subaccounts,
        parsedTestData,
      },
      draft.subaccount_id, // not in form and not allowed to change
    ).then(() => {
      setHasSaved(true);
      showAlert({ type: 'success', message: 'Template settings updated.' });
    });
  };

  const parseToggle = value => !!value;

  const renderPublishedIntro = () => {
    const { hasDraft } = props;
    return (
      <Panel.Section>
        <p
          className={styles.SettingsIntro}
        >{`Template settings can only be changed in drafts. Simply select '${
          hasDraft ? 'Edit Draft' : 'Save as Draft'
        }' in the top right to access the draft version, and adjust settings as needed.`}</p>
      </Panel.Section>
    );
  };

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
    draft,
    isReadOnly,
  } = props;
  const isEditingDisabled = submitting || isReadOnly;
  const isSubmissionDisabled = submitting || !valid || pristine || isReadOnly;
  const canViewSubaccountSection = hasSubaccounts && canViewSubaccount;
  const fromEmailHelpText =
    !domainsLoading && !domains.length
      ? subaccountId
        ? 'The selected subaccount does not have any verified sending domains.'
        : 'You do not have any verified sending domains to use.'
      : null;

  return (
    <>
      {isPublishedMode && renderPublishedIntro()}
      <form onSubmit={handleSubmit(updateSettings)}>
        <Panel.Section>
          <Stack>
            <Field
              name="name"
              component={TextFieldWrapper}
              label="Template Name"
              disabled={isEditingDisabled}
              validate={required}
            />

            <CopyField
              name="id"
              id="template-id-field"
              label="Template ID"
              value={draft.id}
              helpText={"A Unique ID for your template, we'll fill this in for you."}
              disabled={true}
            />
          </Stack>
        </Panel.Section>

        {canViewSubaccountSection && (
          <Panel.Section>
            <SubaccountSection newTemplate={false} disabled={isEditingDisabled} />
          </Panel.Section>
        )}

        <Panel.Section>
          <Stack>
            <Field
              name="content.subject"
              component={TextFieldWrapper}
              label="Subject"
              validate={required}
              disabled={isEditingDisabled}
            />

            <Field
              name="content.from.email"
              component={FromEmailWrapper}
              placeholder="example@email.com"
              label="From Email"
              // Do not try to validate email, let our API make that decision
              validate={[required]}
              domains={domains}
              helpText={fromEmailHelpText}
              disabled={isEditingDisabled}
            />

            <Field
              name="content.from.name"
              component={TextFieldWrapper}
              label="From Name"
              helpText="A friendly from for your recipients."
              disabled={isEditingDisabled}
            />

            <Field
              // Do not try to validate email, let our API make that decision
              name="content.reply_to"
              component={TextFieldWrapper}
              label="Reply To"
              helpText="An email address recipients can reply to."
              disabled={isEditingDisabled}
            />

            <Field
              name="description"
              component={TextFieldWrapper}
              label="Description"
              helpText="Not visible to recipients."
              disabled={isEditingDisabled}
            />
          </Stack>
        </Panel.Section>
        <Panel.Section>
          <Stack>
            <Field
              name="options.open_tracking"
              component={ToggleBlock}
              label="Track Opens"
              type="checkbox"
              parse={parseToggle}
              disabled={isEditingDisabled}
            />

            <Field
              name="options.click_tracking"
              component={ToggleBlock}
              label="Track Clicks"
              type="checkbox"
              parse={parseToggle}
              disabled={isEditingDisabled}
            />

            <Field
              name="options.transactional"
              component={ToggleBlock}
              label="Transactional"
              type="checkbox"
              parse={parseToggle}
              helpText="Transactional messages are triggered by a user’s actions on the website, like requesting a password reset, signing up, or making a purchase."
              disabled={isEditingDisabled}
            />
          </Stack>
        </Panel.Section>

        <Panel.Section>
          <Button variant="primary" type="submit" disabled={isSubmissionDisabled}>
            Update Settings
          </Button>
        </Panel.Section>
      </form>
    </>
  );
}
