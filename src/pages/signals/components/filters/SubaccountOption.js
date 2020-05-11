import React from 'react';
import { Check, ChevronRight } from '@sparkpost/matchbox-icons';
import { UnstyledLink } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './SubaccountOption.module.scss';
import hibanaStyles from './SubaccountOptionHibana.module.scss';

function SubaccountOption(props) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  const handleClick = () => {
    const { onChange, selected, value } = props;

    if (!selected) {
      onChange(value);
    }
  };

  const { label, nested, onOpen, selected } = props;

  if (nested) {
    return (
      <UnstyledLink className={styles.Option} onClick={onOpen}>
        {label} <ChevronRight />
      </UnstyledLink>
    );
  }

  return (
    <UnstyledLink className={styles.Option} onClick={handleClick}>
      {label} {selected && <Check className={styles.Check} />}
    </UnstyledLink>
  );
}

export default SubaccountOption;
