import EditAmpSection from '../components/EditAmpSection';
import EditHtmlSection from '../components/EditHtmlSection';
import EditTextSection from '../components/EditTextSection';

const editTabs = [
  {
    content: 'HTML',
    key: 'html',
    render: EditHtmlSection
  },
  {
    content: 'AMP HTML',
    key: 'amp_html',
    render: EditAmpSection
  },
  {
    content: 'Text',
    key: 'text',
    render: EditTextSection
  }
];

export default editTabs;
