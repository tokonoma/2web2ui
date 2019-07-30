import React from 'react';
import { connect } from 'react-redux';
import { Page, Panel, TextField } from '@sparkpost/matchbox';

import { getSeedList } from 'src/actions/inboxPlacement';
import { selectReferenceSeed } from 'src/selectors/inboxPlacement';
import { showAlert } from 'src/actions/globalAlert';
import { Loading } from 'src/components';
import SaveCSVButton from 'src/components/collection/SaveCSVButton';

import styles from './SeedList.module.scss';

export class SeedListPage extends React.Component {
  componentDidMount() {
    this.props.getSeedList();
  }

  render() {
    const { seeds, pending, referenceSeed } = this.props;

    const csvData = ['Seed Address'].concat(seeds.map((row) => [row]));

    if (pending) {
      return <Loading/>;
    }

    return (
      <Page title='Inbox Placement | Seed List'>
        <Panel>
          <Panel.Section>
            <h1>Seedlist</h1>
          </Panel.Section>

          <Panel.Section>
            <h3>Directions</h3>
          </Panel.Section>
          <Panel.Section>
            <p>{`Make sure you are sending the following ${seeds.length} addresses.`}</p>
            <p>{`Your reference address is ${referenceSeed}`}</p>
            <p>Reference address is .....</p>
            <TextField multiline value={seeds.join('\n')} resize="vertical" rows={12}/>
            <div className={styles.DownloadButtonContainer}>
              <SaveCSVButton primary data={csvData} saveCsv={true} caption='Download List'/>
            </div>
          </Panel.Section>
        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({
  seeds: state.inboxPlacement.seeds,
  pending: state.inboxPlacement.pending,
  referenceSeed: selectReferenceSeed(state)
});
export default connect(mapStateToProps, { getSeedList, showAlert })(SeedListPage);


