import React, { useState } from 'react';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './Animator.module.scss';
import hibanaStyles from './AnimatorHibana.module.scss';

function Animator({ children, in: inProp }) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const [node, setNode] = useState(null);

  const transitionNode = node => {
    setNode(node);
  };

  return (
    <Transition in={inProp} timeout={{ enter: 150, exit: 100 }}>
      {state => {
        const classes = classNames(styles.Animator, state && styles[state]);
        const height = node && state === 'exiting' ? node.getBoundingClientRect().height : 'auto';

        return (
          <div className={classes} style={{ height }} ref={transitionNode}>
            {children}
          </div>
        );
      }}
    </Transition>
  );
}

export default Animator;
