import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { getInjections } from 'src/actions/signals';
import { Grid } from '@sparkpost/matchbox';
import Page from '../components/SignalsPage';
import HealthScoreOverview from '../containers/HealthScoreOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import CurrentHealthGauge from './components/CurrentHealthGauge/CurrentHealthGauge';
import HealthScoreChart from './components/HealthScoreChart/HealthScoreChart';
import _ from 'lodash';

export class HealthScoreDashboard extends Component {
  componentDidMount() {
    this.props.getSubaccounts();
    this.props.getInjections({ relativeRange: this.props.filters.relativeRange });
    // TODO Lift the GET health score request to this component
  }

  render() {
    const { subaccounts, injections } = this.props;

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
            <HealthScoreChart injections={injections} />
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
  subaccounts: state.subaccounts.list,
  filters: state.signalOptions,
  injections: _.get(state, 'signals.injections', {})
});

const mapDispatchToProps = {
  getSubaccounts,
  getInjections
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthScoreDashboard);
