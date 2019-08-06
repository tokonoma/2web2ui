import React from 'react';
import { connect } from 'react-redux';
import { Page, Panel, TextField, UnstyledLink } from '@sparkpost/matchbox';
import { FileDownload } from '@sparkpost/matchbox-icons/matchbox-icons';

import { getSeedList } from 'src/actions/inboxPlacement';
import { selectReferenceSeed } from 'src/selectors/inboxPlacement';
import { showAlert } from 'src/actions/globalAlert';
import { ApiErrorBanner, CopyToClipboard, Loading } from 'src/components';
import SaveCSVButton from 'src/components/collection/SaveCSVButton';

import styles from './SeedList.module.scss';

export class SeedListPage extends React.Component {
  componentDidMount() {
    this.props.getSeedList();
  }

  renderError = () => {
    const { error, getSeedList } = this.props;

    return <ApiErrorBanner
      message={'Sorry, we seem to have had some trouble loading seedlist.'}
      errorDetails={error.message}
      reload={getSeedList}
    />;
  };

  renderContents = () => {
    const { seeds, referenceSeed } = this.props;
    const csvData = seeds.map((address) => ({ 'Seed Address': address }));

    return (<>
      <Panel.Section>
        <div>
          <p className={styles.Directions}>To run an Inbox Placement test, first add the following email addresses to
            your list.
            Make sure that the reference email address <strong>{referenceSeed}</strong> is the first one in your list.
          </p>
          <hr className={styles.hr}/>
          <p className={styles.Directions}>
            Next, set up your campaign. Make sure you are sending to the full list of seed email addresses.
            For best results, set the <strong>`X-SP-Inbox-Placement`</strong> header with a unique value such
            as <strong>"my-first-test"</strong>.
            If you don't, you may run into issues if your have more than one test running with the same
            subject line.
          </p>
          <p>
            Send the email and jump back to <UnstyledLink to="/inbox-placement">Inbox
            Placement</UnstyledLink> to see the results.
          </p>
        </div>
        <TextField multiline value={seeds.join('\n')} resize="vertical" rows={10} readOnly/>
        <div>
          <SaveCSVButton data={csvData} saveCsv={true} caption={<span><FileDownload/>Download CSV</span>}/>
          <span className={styles.CopyButton}>
            <CopyToClipboard value={seeds.join(',')} label='Copy List'/>
          </span>
        </div>
      </Panel.Section>
    </>);
  };

  render() {
    const { pending, error } = this.props;

    if (pending) {
      return <Loading/>;
    }

    return (
      <Page
        breadcrumbAction={{
          content: 'Inbox Placement Tests',
          onClick: () => this.props.history.push('/inbox-placement')
        }}
        title='Inbox Placement | Start a Test'
      >
        <Panel>
          <Panel.Section>
            <h3>Send To These Addresses</h3>
          </Panel.Section>
          {error ? this.renderError() : this.renderContents()}

        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({
  seeds: state.inboxPlacement.seeds,
  pending: state.inboxPlacement.seedsPending,
  error: state.inboxPlacement.seedsError,
  referenceSeed: selectReferenceSeed(state)
});
export default connect(mapStateToProps, { getSeedList, showAlert })(SeedListPage);


