import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import { Drawer as HibanaDrawer } from '@sparkpost/matchbox-hibana';
import { useDrawer as matchboxUseDrawer } from '@sparkpost/matchbox-hibana';

function Drawer(props) {
  const [{ isHibanaEnabled }] = useHibana();
  if (!isHibanaEnabled) {
    throw new Error(
      'Drawer component not available in original matchbox. Please remove or restrict to Hibana',
    );
  }
  return <HibanaDrawer {...props} />;
}

function Footer(props) {
  const [{ isHibanaEnabled }] = useHibana();
  if (!isHibanaEnabled) {
    throw new Error(
      'Drawer component not available in original matchbox. Please remove or restrict to Hibana',
    );
  }
  return <HibanaDrawer.Footer {...props} />;
}

function Content(props) {
  const [{ isHibanaEnabled }] = useHibana();
  if (!isHibanaEnabled) {
    throw new Error(
      'Drawer component not available in original matchbox. Please remove or restrict to Hibana',
    );
  }
  return <HibanaDrawer.Content {...props} />;
}

function Header(props) {
  const [{ isHibanaEnabled }] = useHibana();
  if (!isHibanaEnabled) {
    throw new Error(
      'Drawer component not available in original matchbox. Please remove or restrict to Hibana',
    );
  }
  return <HibanaDrawer.Header {...props} />;
}

Footer.displayName = 'Drawer.Footer';
Content.displayName = 'Drawer.Content';
Header.displayName = 'Drawer.Header';

Drawer.Footer = Footer;
Drawer.Content = Content;
Drawer.Header = Header;

export const useDrawer = matchboxUseDrawer;
export default Drawer;
