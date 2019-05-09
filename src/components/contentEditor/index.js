import asyncComponent from 'src/components/asyncComponent';

const ContentEditor = asyncComponent(
  () => import('./ContentEditor')
);

ContentEditor.displayName = 'ContentEditor';

export default ContentEditor;
