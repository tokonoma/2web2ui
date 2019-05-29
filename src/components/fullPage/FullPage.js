import React from 'react';
import { UnstyledLink } from '@sparkpost/matchbox';
import { ChevronLeft } from '@sparkpost/matchbox-icons';
import propTypes from 'prop-types';
import PageLink from 'src/components/pageLink';
import SparkPost from 'src/components/sparkPost/SparkPost';
import styles from './FullPage.module.scss';

// uses the entire viewport
const FullPage = ({ breadcrumbRedirectsTo, children, primaryArea, title }) => (
    <>
      <div className={styles.FullPageNav}>
        <div className={styles.FullPageHeaderArea}>
          <UnstyledLink
            className={styles.FullPageBreadcrumb}
            component={PageLink}
            to={breadcrumbRedirectsTo}
          >
            <ChevronLeft size={28} />
            <SparkPost.Icon height={28} width={28} />
          </UnstyledLink>
          <h1 className={styles.FullPageTitle}>{title}</h1>
        </div>
        <div className={styles.FullPagePrimaryArea}>
          {primaryArea}
        </div>
      </div>
      <div className={styles.FullPageContents}>
        {children}
      </div>
    </>
);

FullPage.propTypes = {
  breadcrumbRedirectsTo: propTypes.string.isRequired,
  primaryArea: propTypes.node,
  title: propTypes.node.isRequired
};

export default FullPage;
