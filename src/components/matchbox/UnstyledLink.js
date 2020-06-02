import React from 'react';
import { UnstyledLink as OGUnstyledLink } from '@sparkpost/matchbox';
import { UnstyledLink as HibanaUnstyledLink } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

const UnstyledLink = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGUnstyledLink {...omitSystemProps(props)} />;
  }

  return <HibanaUnstyledLink {...props} />;
};

HibanaUnstyledLink.displayName = 'HibanaUnstyledLink';

export default UnstyledLink;
