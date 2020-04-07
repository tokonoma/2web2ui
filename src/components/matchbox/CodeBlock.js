import React from 'react';
import { CodeBlock as OGCodeBlock } from '@sparkpost/matchbox';
import { CodeBlock as HibanaCodeBlock } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function CodeBlock(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGCodeBlock {...omitSystemProps(props, ['height'])} />;
  }

  return <HibanaCodeBlock {...props} />;
}

HibanaCodeBlock.displayName = 'HibanaCodeBlock';

export default CodeBlock;
