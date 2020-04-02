import { UnstyledLink as OGUnstyledLink } from '@sparkpost/matchbox';
import { UnstyledLink as HibanaUnstyledLink } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

const UnstyledLink = props => {
  return useHibanaToggle(OGUnstyledLink, HibanaUnstyledLink)(props)();
};

HibanaUnstyledLink.displayName = 'HibanaUnstyledLink';

export default UnstyledLink;
