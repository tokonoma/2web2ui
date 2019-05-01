import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { Panel, Grid } from '@sparkpost/matchbox';
import Page from '../components/SignalsPage';
import SpamTrapOverview from '../containers/SpamTrapOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import InfoTooltip from '../components/InfoTooltip';
import { SPAM_TRAP_INFO } from '../constants/info';

export class SpamTrapDashboard extends Component {
  componentDidMount() {
    this.props.getSubaccounts();
  }

  render() {
    const { subaccounts } = this.props;

    return (
      <Page title={
          <>
            Spam Trap Monitoring
            <InfoTooltip content={SPAM_TRAP_INFO} />
          </>
      }>
        <Panel sectioned>
          <Grid>
            <Grid.Column xs={4}>
              <DateFilter />
            </Grid.Column>
            <SubaccountFilter />
            <FacetFilter />
          </Grid>
        </Panel>
        <SpamTrapOverview subaccounts={subaccounts} hideTitle />
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({
  subaccounts: state.subaccounts.list
});

const mapDispatchToProps = {
  getSubaccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(SpamTrapDashboard);
