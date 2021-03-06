import React from 'react';
import { Field, Form } from 'redux-form';
import { Grid, Button, Page, Panel, Stack } from 'src/components/matchbox';
import ContentEditor from 'src/components/contentEditor';
import CopyField from 'src/components/copyField';
import { RedirectAndAlert } from 'src/components/globalAlert';
import { ExternalLink, PageLink } from 'src/components/links';
import Loading from 'src/components/loading';
import TextFieldWrapper from 'src/components/reduxFormWrappers/TextFieldWrapper';
import SubaccountSection from 'src/components/subaccountSection';
import { LINKS } from 'src/constants';
import { maxLength, required } from 'src/helpers/validation';
import DeleteSnippetLink from './components/DeleteSnippetLink';

export default class EditPage extends React.Component {
  componentDidMount() {
    const { id, subaccountId } = this.props;
    this.props.getSnippet({ id, subaccountId });
  }

  componentWillUnmount() {
    this.props.clearSnippet();
  }

  secondaryActions = [
    {
      Component: props => (
        <DeleteSnippetLink {...props} id={this.props.id} subaccountId={this.props.subaccountId} />
      ),
      content: 'Delete',
      to: '/', // needed to render Component
      visible: () => this.props.canModify,
    },
    {
      Component: PageLink,
      content: 'Duplicate',
      to: {
        pathname: '/snippets/create',
        state: {
          id: this.props.id,
          subaccountId: this.props.subaccountId,
        },
      },
      visible: () => this.props.canModify,
    },
  ];

  submitSnippet = ({
    content: { html, text, amp_html } = {},
    id,
    name,
    subaccount,
    shared_with_subaccounts: sharedWithSubaccounts,
  }) => {
    // must handle when subaccount is set to null by SubaccountSection
    const subaccountId = subaccount ? subaccount.id : undefined;
    const { updateSnippet, showAlert } = this.props;

    return updateSnippet({
      html,
      id,
      name,
      sharedWithSubaccounts,
      subaccountId,
      text,
      amp_html,
    }).then(() => showAlert({ type: 'success', message: 'Snippet saved' }));
  };

  render() {
    const {
      canModify,
      loadingError,
      handleSubmit,
      hasSubaccounts,
      canViewSubaccount,
      id,
      loading,
      submitting,
    } = this.props;
    const disabled = !canModify || submitting;
    const canViewSubaccountSection = hasSubaccounts && canViewSubaccount;
    if (loadingError) {
      return (
        <RedirectAndAlert
          to="/snippets"
          alert={{ type: 'error', message: `Unable to load ${id} snippet` }}
        />
      );
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title="Edit Snippet"
        breadcrumbAction={{ Component: PageLink, content: 'View All Snippets', to: '/snippets' }}
        primaryAction={{
          Component: Button,
          content: 'Save Snippet',
          disabled,
          onClick: handleSubmit(this.submitSnippet),
        }}
        secondaryActions={this.secondaryActions.filter(({ visible = () => true }) => visible())}
      >
        <Form onSubmit={this.submitSnippet}>
          <Grid>
            <Grid.Column xs={12} lg={4}>
              <Panel sectioned>
                <Stack>
                  <Field
                    name="name"
                    component={TextFieldWrapper}
                    disabled={disabled}
                    label="Snippet Name"
                    validate={[required, maxLength(64)]}
                    helpText={
                      <ExternalLink to={LINKS.SNIPPET_API_DOCS}>
                        Learn more about Snippets
                      </ExternalLink>
                    }
                  />
                  <Field
                    name="id"
                    component={TextFieldWrapper}
                    disabled={true} // id cannot change after being set
                    helpText="This is a unique identifier to reference your snippet in a template."
                    label="Snippet ID"
                  />
                  {canViewSubaccountSection && (
                    <SubaccountSection newTemplate={false} disabled={disabled} />
                  )}
                  <CopyField
                    label="Code Example"
                    helpText="Copy and use this code in your templates"
                    value={`{{ render_snippet( "${id}" ) }}`}
                  />
                </Stack>
              </Panel>
            </Grid.Column>
            <Grid.Column xs={12} lg={8}>
              <ContentEditor contentOnly={true} readOnly={disabled} />
            </Grid.Column>
          </Grid>
        </Form>
      </Page>
    );
  }
}
