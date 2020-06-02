import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Close } from '@sparkpost/matchbox-icons';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { ButtonLink } from 'src/components/links';
import { Button, ScreenReaderOnly } from 'src/components/matchbox';
import OGStyles from './FullBanner.module.scss';
import hibanaStyles from './FullBannerHibana.module.scss';

function FullBanner(props) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const { children, className } = props;

  return (
    <div className={classNames(styles.FullBanner, className)} role="alert">
      <div className={styles.FullBannerContainer}>{children}</div>
    </div>
  );
}

function Icon({ as }) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const Component = as;

  return <Component className={styles.Icon} />;
}

function CloseButton({ onClick }) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  return (
    <Button className={styles.CloseButton} flat onClick={onClick}>
      <Close />

      <ScreenReaderOnly>Close</ScreenReaderOnly>
    </Button>
  );
}

function Link({ as, ...rest }) {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const Component = as;

  return <Component {...rest} className={styles.Link} />;
}

FullBanner.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

Link.defaultProps = {
  as: ButtonLink,
};

FullBanner.CloseButton = CloseButton;
FullBanner.Icon = Icon;
FullBanner.Link = Link;

export default FullBanner;
