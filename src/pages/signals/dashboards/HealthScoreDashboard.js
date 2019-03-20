import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { Grid, Panel } from '@sparkpost/matchbox';
import Page from '../components/SignalsPage';
import HealthScoreOverview from '../containers/HealthScoreOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import CurrentHealthGauge from './components/CurrentHealthGauge/CurrentHealthGauge';

export class HealthScoreDashboard extends Component {
  componentDidMount() {
    this.props.getSubaccounts();
    // TODO Lift the GET health score request to this component
  }

  render() {
    const { subaccounts } = this.props;

    return (
      <Page
        title='Health Score'
        primaryArea={<DateFilter />}
      >
        <Grid>
          <Grid.Column xs={4}>
            <CurrentHealthGauge />
          </Grid.Column>
          <Grid.Column xs={8}>
            <Panel sectioned></Panel>
          </Grid.Column>
        </Grid>
        <div style={{ marginBottom: '1rem', marginTop: '1.5rem', textAlign: 'right' }}>
          <SubaccountFilter />
          <FacetFilter />
        </div>
        <HealthScoreOverview subaccounts={subaccounts} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthScoreDashboard);
