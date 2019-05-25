import EditContents from '../components/EditContents';
import EditContentsPrimaryArea from '../components/EditContentsPrimaryArea';

const editNavigationLinks = [
  {
    content: 'Content',
    key: 'content',
    render: EditContents,
    renderPrimaryArea: EditContentsPrimaryArea,
    routeKey: 'content'
  },
  {
    content: 'Settings',
    key: 'settings',
    render: () => null,
    renderPrimaryArea: () => null,
    routeKey: 'settings'
  }
];

export default editNavigationLinks;
