import React from 'react';
import { Page, Panel, TextField } from '@sparkpost/matchbox';
import { getSeedList } from '../../actions/inboxPlacement';
import { showAlert } from '../../actions/globalAlert';
import { connect } from 'react-redux';
import SaveCSVButton from 'src/components/collection/SaveCSVButton';

import styles from './SeedList.module.scss';

export class SeedListPage extends React.Component {
  componentDidMount() {
    this.props.getSeedList();
  }

  render() {
    const { seeds } = this.props;

    const csvData = ['Seed Address'].concat(seeds.map((row) => [row]));

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
            <p>Make sure you are sending the following N number of addresses.</p>
            <p>Your reference addresses are x and y.</p>
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

const mapStateToProps = ({ inboxPlacement }, props) => ({
  seeds: inboxPlacement.seeds
});
export default connect(mapStateToProps, { getSeedList, showAlert })(SeedListPage);


