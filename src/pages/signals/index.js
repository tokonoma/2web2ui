import ComplaintsByCohortPage from './ComplaintsByCohortPage';
import EngagementRateByCohortPage from './EngagementRateByCohortPage';
import EngagementRecencyPage from './EngagementRecencyPage';
import HealthScorePage from './HealthScorePage';
import HealthScorePageV3 from './HealthScorePageV3';
import SpamTrapPage from './SpamTrapPage';
import UnsubscribeRateByCohortPage from './UnsubscribeRateByCohortPage';
import IntegrationPage from './IntegrationPage';
import * as dashboards from './dashboards';
import withIngestBatchEvents from './containers/withIngestBatchEvents';

export default {
  ComplaintsByCohortPage,
  EngagementRateByCohortPage,
  EngagementRecencyPage,
  HealthScorePage,
  HealthScorePageV3,
  SpamTrapPage,
  UnsubscribeRateByCohortPage,
  IntegrationPage: withIngestBatchEvents(IntegrationPage),
  ...dashboards
};
