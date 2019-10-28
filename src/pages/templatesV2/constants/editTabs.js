import EditAmpSection from '../components/EditAmpSection';
import EditHtmlSection from '../components/EditHtmlSection';
import EditTextSection from '../components/EditTextSection';
import EditTestDataSection from '../components/EditTestDataSection';

const editTabs = [
  {
    content: 'HTML',
    key: 'html',
    render: EditHtmlSection,
    role: 'button',
    to: 'javascript:void(0);',
    ['data-id']: 'tab-html'
  },
  {
    content: 'AMP HTML',
    key: 'amp_html',
    render: EditAmpSection,
    role: 'button',
    to: 'javascript:void(0);',
    ['data-id']: 'tab-amp-html'
  },
  {
    content: 'Text',
    key: 'text',
    render: EditTextSection,
    role: 'button',
    to: 'javascript:void(0);',
    ['data-id']: 'tab-text'
  },
  {
    content: 'Test Data',
    key: 'test_data',
    render: EditTestDataSection,
    role: 'button',
    to: 'javascript:void(0);',
    ['data-id']: 'tab-test-data'
  }
];

export default editTabs;
