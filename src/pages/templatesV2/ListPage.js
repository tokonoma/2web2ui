import React, { Component } from 'react';
import { Page } from '@sparkpost/matchbox';

import { ApiErrorBanner, DeleteModal, Loading, TableCollection } from 'src/components';
import { Templates } from 'src/components/images';
import PageLink from 'src/components/pageLink';
import { resolveTemplateStatus } from 'src/helpers/templates';
import { Action, LastUpdated, Name, Status } from './components/ListComponents';

import styles from './ListPage.module.scss';

export default class ListPage extends Component {
  state = {
    showDeleteModal: false,
    templateToDelete: null
  };

  componentDidMount() {
    this.props.listTemplates();
  }

  deleteTemplate = () => {
    const { deleteTemplate, listTemplates, showAlert } = this.props;
    const { id, name } = this.state.templateToDelete;
    return deleteTemplate(id)
      .then(() => {
        showAlert({ type: 'success', message: `Template ${name} deleted` });
        this.toggleDeleteModal();
        return listTemplates();
      });
  };

  toggleDeleteModal = (props) => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal, templateToDelete: props });
  };

  columns = [
    {
      component: Name,
      header: {
        label: 'Template Name',
        sortKey: 'name'
      }
    },
    {
      component: Status,
      header: {
        label: 'Status',
        sortKey: (template) => [
          resolveTemplateStatus(template).publishedWithChanges,
          template.published
        ]
      }
    },
    {
      component: LastUpdated,
      header: {
        label: 'Last Updated',
        sortKey: 'last_update_time'
      }
    },
    {
      component: Action,
      header: {
        width: 20
      },
      onClick: this.toggleDeleteModal
    }
  ];

  renderRow = (columns) => (props) => (
    columns.map(({ component: Component, onClick }) => <Component onClick={onClick} {...props} />)
  );

  render() {
    const { canModify, error, listTemplates, loading, templates, deletePending } = this.props;

    if (loading) {
      return <Loading/>;
    }

    return (
      <Page
        primaryAction={(
          canModify
            ? { Component: PageLink, content: 'Create New', to: '/templates/create' }
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
            <TableCollection
              columns={this.columns.map(({ header }) => header)}
              rows={templates}
              getRowData={this.renderRow(this.columns)}
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
              isPending={deletePending}
            />
          </>
        )}
      </Page>
    );
  }
}
