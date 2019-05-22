import EditAmpSection from '../components/EditAmpSection';
import EditHtmlSection from '../components/EditHtmlSection';
import EditTextSection from '../components/EditTextSection';

const editTabs = [
  {
    content: 'HTML',
    key: 'html',
    render: EditHtmlSection,
    routeKey: 'html'
  },
  {
    content: 'AMP HTML',
    key: 'amp_html',
    render: EditAmpSection,
    routeKey: 'amp-html'
  },
  {
    content: 'Text',
    key: 'text',
    render: EditTextSection,
    routeKey: 'text'
  }
];

export default editTabs;
