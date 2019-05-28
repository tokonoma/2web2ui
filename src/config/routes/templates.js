import { templates, templatesV2 } from 'src/pages';
import { hasGrants } from '../../helpers/conditions';
import App from '../../components/layout/App';


const v1Routes = [
  {
    path: '/templates',
    component: 'ListPage',
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Templates',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/create/:id?',
    component: 'CreatePage',
    condition: hasGrants('templates/modify'),
    layout: App,
    title: 'New Template',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/edit/:id',
    component: 'EditPage',
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Edit Template',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/edit/:id/next/:tabKey?',
    component: 'EditAndPreviewPage',
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Edit Template',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/edit/:id/published',
    component: 'PublishedPage',
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'View Published Template',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/preview/:id',
    component: 'PreviewDraftPage',
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Preview Draft Template',
    supportDocSearch: 'template'
  },
  {
    path: '/templates/preview/:id/published',
    component: 'PreviewPublishedPage',
    condition: hasGrants('templates/view'),
    layout: App,
    title: 'Preview Published Template',
    supportDocSearch: 'template'
  }
];

const allTemplateRoutes = v1Routes.map((route) => ({
  ...route,
  component: templates[route.component]
})).concat(v1Routes.map((route) => ({
  ...route,
  path: route.path.replace('/templates', '/templatesv2'),
  component: templatesV2[route.component] ? templatesV2[route.component] : templates[route.component]
})));

export default allTemplateRoutes;
