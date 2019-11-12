import { templates, templatesV2 } from 'src/pages';
import { hasGrants } from '../../helpers/conditions';
import App from '../../components/layout/App';
import Fullscreen from 'src/components/layout/Fullscreen';

const templatesRoutes = [
  {
    path: '/templates',
    component: templates.ListPage,
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Templates',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/create',
    component: templates.CreatePage,
    condition: hasGrants('templates/modify'),
    layout: App,
    title: 'Create New Template',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/edit/:id/:version?/:navKey?',
    component: templatesV2.EditAndPreviewPage,
    condition: hasGrants('templates/view'),
    layout: Fullscreen,
    title: 'Edit Template',
    supportDocSearch: 'template'
  }
];

export default templatesRoutes;
