import React from 'react';
import propTypes from 'prop-types';
import { ChevronLeft } from '@sparkpost/matchbox-icons';
import { PageLink } from 'src/components/links';
import { ScreenReaderOnly } from 'src/components/matchbox';
import SparkPost from 'src/components/sparkPost/SparkPost';
import styles from './FullPage.module.scss';

// uses the entire viewport
const FullPage = ({ breadcrumbRedirectsTo, children, primaryArea, title }) => (
  <>
    <div className={styles.FullPageNav}>
      <div className={styles.FullPageHeaderArea}>
        <PageLink className={styles.FullPageBreadcrumb} to={breadcrumbRedirectsTo}>
          <ChevronLeft size={28} />
          <SparkPost.Icon height={28} width={28} />
          <ScreenReaderOnly>Back</ScreenReaderOnly>
        </PageLink>
        <h1 className={styles.FullPageTitle}>{title}</h1>
      </div>
      <div className={styles.FullPagePrimaryArea}>{primaryArea}</div>
    </div>
    <div className={styles.FullPageContents}>{children}</div>
  </>
);

FullPage.propTypes = {
  breadcrumbRedirectsTo: propTypes.string.isRequired,
  primaryArea: propTypes.node,
  title: propTypes.node.isRequired,
};

export default FullPage;
