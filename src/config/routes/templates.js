import { templates } from 'src/pages';
import { hasGrants } from '../../helpers/conditions';
import App from '../../components/layout/App';
import Fullscreen from 'src/components/layout/Fullscreen';

const navCategories = {
  category: 'Content',
  subcategory: 'Templates',
};

const templatesRoutes = [
  {
    path: '/templates',
    component: templates.ListPage,
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Templates',
    supportDocSearch: 'template',
    ...navCategories,
  },
  {
    path: '/templates/create',
    component: templates.CreatePage,
    condition: hasGrants('templates/modify'),
    layout: App,
    title: 'Create New Template',
    supportDocSearch: 'template',
    ...navCategories,
  },
  {
    path: '/templates/edit/:id/:version?/:navKey?',
    component: templates.EditAndPreviewPage,
    condition: hasGrants('templates/view'),
    layout: Fullscreen,
    title: 'Edit Template',
    supportDocSearch: 'template',
    ...navCategories,
  },
];

export default templatesRoutes;
