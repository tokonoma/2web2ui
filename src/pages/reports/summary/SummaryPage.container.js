import useHibanaToggle from 'src/hooks/useHibanaToggle';
import OGSummaryPage from './SummaryPage';
import SummaryPageHibana from './SummaryPageHibana';

const SummaryPage = props => {
  return useHibanaToggle(OGSummaryPage, SummaryPageHibana)(props);
};

export default SummaryPage;
