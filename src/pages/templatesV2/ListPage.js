/* eslint-disable max-lines */
import React, { Component } from 'react';
import { Page } from '@sparkpost/matchbox';
import { ApiErrorBanner, DeleteModal, Loading, TableCollection } from 'src/components';
import { Templates } from 'src/components/images';
import PageLink from 'src/components/pageLink';
import { resolveTemplateStatus } from 'src/helpers/templates';
import RecentActivity from './components/RecentActivity';
import { DeleteAction, DuplicateAction, LastUpdated, Name, Status } from './components/ListComponents';
import DuplicateTemplateModal from './components/editorActions/DuplicateTemplateModal';
import { routeNamespace } from './constants/routes';
import styles from './ListPage.module.scss';

export default class ListPage extends Component {
  state = {
    showDeleteModal: false,
    showDuplicateModal: false,
    templateToDelete: null,
    templateToDuplicate: null,
    testDataToDuplicate: null
  };

  componentDidMount() {
    this.props.listTemplates();
  }

  deleteTemplate = () => {
    const {
      deleteTemplateV2,
      listTemplates,
      showAlert
    } = this.props;
    const { id, name } = this.state.templateToDelete;

    return deleteTemplateV2({ id })
      .then(() => {
        showAlert({ type: 'success', message: `Template ${name} deleted` });
        this.toggleDeleteModal();

        return listTemplates();
      });
  };

  toggleDeleteModal = (template) => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      templateToDelete: template
    });
  };

  toggleDuplicateModal = (template) => {
    const { getDraft, getPublished, getTestDataV2 } = this.props;
    const isPublished = template.published;

    this.setState({ showDuplicateModal: true });

    if (isPublished) {
      return getPublished(template.id)
        .then((res) => {
          this.setState({
            templateToDuplicate: res,
            testDataToDuplicate: getTestDataV2({ id: res.id, mode: 'published' })
          });
        });
    }

    return getDraft(template.id)
      .then((res) => {
        this.setState({
          templateToDuplicate: res,
          testDataToDuplicate: getTestDataV2({ id: res.id, mode: 'draft' })
        });
      });
  }

  handleDuplicateSuccess = () => {
    const { showAlert, listTemplates } = this.props;
    const template = this.state.templateToDuplicate;

    this.setState({ showDuplicateModal: false });

    showAlert({
      type: 'success',
      message: `Template ${template.name} duplicated`
    });

    return listTemplates();
  };

  getColumns = () => {
    const { canModify } = this.props;

    const columns = [
      {
        component: Name,
        header: {
          label: 'Template Name',
          sortKey: 'list_name'
        },
        visible: true,
        key: 'list_name'
      },
      {
        component: Status,
        header: {
          label: 'Status',
          sortKey: (template) => [
            resolveTemplateStatus(template).publishedWithChanges,
            template.published
          ]
        },
        visible: true,
        key: 'status'
      },
      {
        component: LastUpdated,
        header: {
          label: 'Last Updated',
          sortKey: 'last_update_time'
        },
        visible: true,
        key: 'lastupdated'
      },
      {
        component: (template) => (
          <span className={styles.Actions}>
            <DuplicateAction
              onClick={() => this.toggleDuplicateModal(template)}
              data-id="table-button-duplicate"
            />

            <DeleteAction
              onClick={() => this.toggleDeleteModal(template)}
              data-id="table-button-delete"
            />
          </span>
        ),
        header: {
          width: 20
        },
        visible: canModify,
        key: 'actions'
      }
    ];

    return columns.filter((col) => col.visible);
  }

  renderRow = (columns) => (props) => columns.map(({ component: Component, onClick }) => <Component onClick={onClick} {...props} />);

  render() {
    const {
      canModify,
      error,
      listTemplates,
      loading,
      templates,
      isDeletePending,
      isCreatePending,
      draftPending,
      publishedPending
    } = this.props;

    if (loading) {
      return <Loading/>;
    }

    const columns = this.getColumns();

    return (
      <Page
        primaryAction={(
          canModify
            ? { Component: PageLink, content: 'Create New', to: `${routeNamespace}/create` }
            : undefined
        )}
        title='Templates'
        empty={{
          show: !error && templates.length === 0,
          image: Templates,
          title: 'Manage your email templates',
          content: <p>Build, test, preview and send your transmissions.</p>
        }}
      >
        {error ? (
          <ApiErrorBanner
            message={'Sorry, we seem to have had some trouble loading your templates.'}
            errorDetails={error.message}
            reload={listTemplates}
          />
        ) : (
          <>
            <p className={styles.LeadText}>
              Create re-usable templates that allow for dynamic personalized content. Easily communicate with your team
              by having a set of named templates to reference.
              Building a library of "go-to" templates for recurrent use-cases to reduce workload for your team.
            </p>

            <RecentActivity
              templates={templates}
              onToggleDeleteModal={this.toggleDeleteModal}
              onToggleDuplicateModal={this.toggleDuplicateModal}
            />

            <h2>All Templates</h2>

            <TableCollection
              columns={columns.map(({ header, key }) => ({ ...header, key }))}
              rows={templates}
              getRowData={this.renderRow(columns)}
              pagination
              filterBox={{
                show: true,
                exampleModifiers: ['id', 'name'],
                itemToStringKeys: ['name', 'id', 'subaccount_id']
              }}
              defaultSortColumn="last_update_time"
              defaultSortDirection="desc"
              saveCsv={false}
            />

            <DeleteModal
              open={this.state.showDeleteModal}
              title="Are you sure you want to delete this template?"
              content={<p>Both the draft and published versions of this template will be deleted.</p>}
              onCancel={this.toggleDeleteModal}
              onDelete={this.deleteTemplate}
              isPending={isDeletePending}
            />

            <DuplicateTemplateModal
              open={this.state.showDuplicateModal}
              onClose={() => this.setState({ showDuplicateModal: false })}
              createTemplate={this.props.createTemplateV2}
              template={this.state.templateToDuplicate}
              successCallback={this.handleDuplicateSuccess}
              showAlert={this.props.showAlert}
              contentToDuplicate={this.state.templateToDuplicate && this.state.templateToDuplicate.content}
              testDataToDuplicate={this.state.testDataToDuplicate}
              isPublishedMode={this.state.templateToDuplicate && this.state.templateToDuplicate.published}
              isLoading={draftPending || publishedPending || isCreatePending}
            />
          </>
        )}
      </Page>
    );
  }
}
