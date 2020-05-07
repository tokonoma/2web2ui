import useHibanaToggle from 'src/hooks/useHibanaToggle';
import SummaryPage from './SummaryPage';
import ReportBuilder from '../../reportBuilder/ReportBuilder';

export default function(props) {
  return useHibanaToggle(SummaryPage, ReportBuilder)(props);
}
