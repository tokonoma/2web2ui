import { Panel as OGPanel } from '@sparkpost/matchbox';
import { Panel as HibanaPanel } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaPanel.displayName = 'HibanaPanel';
HibanaPanel.Section.displayName = 'HibanaPanelSection';
HibanaPanel.Footer.displayName = 'HibanaPanelFooter';
OGPanel.displayName = 'OGPanel';
OGPanel.Section.displayName = 'OGPanelSection';
OGPanel.Footer.displayName = 'OGPanelFooter';

const Panel = props => {
  return useHibanaToggle(OGPanel, HibanaPanel)({ ...props, mb: '400' })();
};

const Section = props => {
  return useHibanaToggle(OGPanel.Section, HibanaPanel.Section)(props)();
};

const Footer = props => {
  return useHibanaToggle(OGPanel.Footer, HibanaPanel.Footer)(props)(['left', 'right']);
};

Section.displayName = 'Panel.Section';
Footer.displayName = 'Panel.Footer';

Panel.Section = Section;
Panel.Footer = Footer;

export default Panel;
