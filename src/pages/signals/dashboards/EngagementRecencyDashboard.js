import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import Page from '../components/SignalsPage';
import EngagementRecencyOverview from '../containers/EngagementRecencyOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';

export class EngagementRecencyDashboard extends Component {
  componentDidMount() {
    this.props.getSubaccounts();
  }

  render() {
    const { subaccounts } = this.props;

    return (
      <Page
        title='Engagement Recency'
        primaryArea={
          <Fragment>
            <SubaccountFilter />
            <DateFilter />
            <FacetFilter />
          </Fragment>
        }
      >
        <EngagementRecencyOverview subaccounts={subaccounts} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EngagementRecencyDashboard);
