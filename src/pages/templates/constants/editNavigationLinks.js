import EditContents from '../components/EditContents';
import EditContentsPrimaryArea from '../components/EditContentsPrimaryArea';

const editNavigationLinks = [
  {
    content: 'Contents',
    key: 'contents',
    render: EditContents,
    renderPrimaryArea: EditContentsPrimaryArea,
    routeKey: 'contents'
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
