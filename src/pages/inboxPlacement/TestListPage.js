import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import { ApiErrorBanner, Loading } from 'src/components';
import { Templates } from 'src/components/images';
import TestCollection from './components/TestCollection';
import withTestList from './containers/TestListPage.container';
import styles from './TestListPage.module.scss';

export class TestListPage extends Component {

  componentDidMount() {
    this.props.listTests();
  }

  renderCollection() {
    return (
      <TestCollection
        tests={this.props.tests}
      />
    );
  }

  renderPage() {
    return (
      <>
        <p className={styles.Description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        {this.renderCollection()}
        </>
    );
  }
  renderError() {
    const { error, listTests } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your tests.'}
        errorDetails={error.message}
        reload={listTests}
      />
    );
  }

  render() {
    const { tests, error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title='Inbox Placement'
        primaryAction={{ content: 'Create a Test', to: '/inbox-placement/create', component: Link }}
        empty={{
          show: !error && tests.length === 0,
          image: Templates,
          title: 'Create a Test',
          content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        }}
      >
        {error ? this.renderError() : this.renderPage()}
      </Page>
    );
  }
}

export default withTestList(TestListPage);
