import React from 'react';
import PropTypes from 'prop-types';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './LineBreak.module.scss';
import hibanaStyles from './LineBreakHibana.module.scss';

const LineBreak = ({ align = 'center', text }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  if (!text) {
    return <hr className={styles.textless} />;
  }

  return (
    <div className={styles[align]}>
      <div>
        <hr />
      </div>
      <span>{text}</span>
      <div>
        <hr />
      </div>
    </div>
  );
};

LineBreak.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  text: PropTypes.string,
};

export default LineBreak;
