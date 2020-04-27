import React from 'react';
import propTypes from 'prop-types';
import { ChevronLeft } from '@sparkpost/matchbox-icons';
import { PageLink } from 'src/components/links';
import { ScreenReaderOnly } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import SparkPost from 'src/components/sparkPost/SparkPost';
import OGStyles from './FullPage.module.scss';
import hibanaStyles from './FullPageHibana.module.scss';

// uses the entire viewport
const FullPage = ({ breadcrumbRedirectsTo, children, primaryArea, title }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <>
      <div className={styles.FullPageNav}>
        <PageLink className={styles.FullPageBreadcrumb} to={breadcrumbRedirectsTo}>
          <ChevronLeft size={28} className={styles.FullPageChevron} />
          <SparkPost.Icon height={28} width={28} />
          <ScreenReaderOnly>Back</ScreenReaderOnly>
        </PageLink>

        <div className={styles.FullPageHeaderArea}>
          <h1 className={styles.FullPageTitle}>{title}</h1>

          <div className={styles.FullPagePrimaryArea}>{primaryArea}</div>
        </div>
      </div>
      <div className={styles.FullPageContents}>{children}</div>
    </>
  );
};

FullPage.propTypes = {
  breadcrumbRedirectsTo: propTypes.string.isRequired,
  primaryArea: propTypes.node,
  title: propTypes.node.isRequired,
};

export default FullPage;
