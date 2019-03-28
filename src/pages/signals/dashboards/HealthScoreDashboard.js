import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { Grid } from '@sparkpost/matchbox';
import Page from '../components/SignalsPage';
import HealthScoreOverview from '../containers/HealthScoreOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import CurrentHealthGauge from './components/CurrentHealthGauge/CurrentHealthGauge';
import HealthScoreChart from './components/HealthScoreChart/HealthScoreChart';

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
          <Grid.Column xs={12} lg={5} xl={4}>
            <CurrentHealthGauge />
          </Grid.Column>
          <Grid.Column xs={12} lg={7} xl={8}>
            <HealthScoreChart />
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

const mapStateToProps = (state) => ({
  subaccounts: state.subaccounts.list
});

const mapDispatchToProps = {
  getSubaccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthScoreDashboard);
