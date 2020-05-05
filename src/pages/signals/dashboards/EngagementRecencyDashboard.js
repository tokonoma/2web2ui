import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as getSubaccounts } from 'src/actions/subaccounts';
import { Grid, Panel } from 'src/components/matchbox';
import Page from '../components/SignalsPage';
import EngagementRecencyOverview from '../containers/EngagementRecencyOverviewContainer';
import FacetFilter from '../components/filters/FacetFilter';
import DateFilter from '../components/filters/DateFilter';
import SubaccountFilter from '../components/filters/SubaccountFilter';
import facets from '../constants/facets';
import InfoTooltip from '../components/InfoTooltip';
import { ENGAGEMENT_RECENCY_INFO } from '../constants/info';

export class EngagementRecencyDashboard extends Component {
  componentDidMount() {
    this.props.getSubaccounts();
  }

  render() {
    const { subaccounts } = this.props;

    return (
      <Page
        title={
          <>
            Engagement Recency
            <InfoTooltip content={ENGAGEMENT_RECENCY_INFO} />
          </>
        }
      >
        <Panel sectioned>
          <Grid>
            <Grid.Column lg={4}>
              <DateFilter />
            </Grid.Column>
            <Grid.Column md={4} xs={12}>
              <SubaccountFilter />
            </Grid.Column>
            <FacetFilter facets={facets} />
          </Grid>
        </Panel>
        <EngagementRecencyOverview defaults={{ perPage: 25 }} subaccounts={subaccounts} hideTitle />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  subaccounts: state.subaccounts.list,
});

const mapDispatchToProps = {
  getSubaccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(EngagementRecencyDashboard);
