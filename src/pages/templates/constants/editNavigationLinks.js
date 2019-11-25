import EditContents from '../components/EditContents';
import TemplateSettings from '../components/settings/EditSettings';
import EditContentsPrimaryArea from '../components/EditContentsPrimaryArea';

const editNavigationLinks = [
  {
    content: 'Email Content',
    key: 'content',
    render: EditContents,
    renderPrimaryArea: EditContentsPrimaryArea,
    routeKey: 'content'
  },
  {
    content: 'Template Settings',
    key: 'settings',
    render: TemplateSettings,
    renderPrimaryArea: EditContentsPrimaryArea,
    routeKey: 'settings'
  }
];

export default editNavigationLinks;
