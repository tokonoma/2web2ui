import React from 'react';
import { connect } from 'react-redux';
import { Grid, Page, Panel, TextField, UnstyledLink } from '@sparkpost/matchbox';

import { getSeedList } from 'src/actions/inboxPlacement';
import { selectReferenceSeed } from 'src/selectors/inboxPlacement';
import { showAlert } from 'src/actions/globalAlert';
import { ApiErrorBanner, Loading } from 'src/components';
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
        <h6>Directions</h6>
      </Panel.Section>
      <Panel.Section>
        <div className={styles.Directions}>
          <p>To run an Inbox Placement test, first add the following email addresses to your list.
            Make sure that the reference email address {referenceSeed} is the first one in your list.
          </p>
          <p>
            Next, set up your campaign. Make sure you are sending to the full list of seed email addresses.
            For best results, set the `X-SP-Inbox-Placement` header with a unique value such as
            "my-first-test".
            If you don't, you may run into issues if your have more than one test running with the same
            subject line.
          </p>
          <p>
            Send the email and jump back to <UnstyledLink to="/inbox-placement">Inbox
            Placement</UnstyledLink> to see the results.
          </p>
        </div>
        <TextField multiline value={seeds.join('\n')} resize="vertical" rows={12} readOnly/>
        <div className={styles.DownloadButtonContainer}>
          <SaveCSVButton primary data={csvData} saveCsv={true} caption='Download List'/>
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
      <Page title='Inbox Placement | Seed List'>
        <Panel>
          <Panel.Section>
            <Grid>
              <Grid.Column xs={12} lg={12}>
                <Panel.Section>
                  <h3>Seedlist</h3>
                </Panel.Section>
                {error ? this.renderError() : this.renderContents()}

              </Grid.Column>
            </Grid>
          </Panel.Section>
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


