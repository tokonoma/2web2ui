import React from 'react';
import _ from 'lodash';
import { Panel } from '@sparkpost/matchbox';
import { FileEdit, CheckCircle } from '@sparkpost/matchbox-icons';
import { formatDate } from 'src/helpers/date';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import PageLink from 'src/components/pageLink';
import { DuplicateAction, DeleteAction } from './ListComponents';
import { routeNamespace } from '../constants/routes';
import styles from './RecentActivity.module.scss';

const RecentActivity = (props) => {
  const {
    templates,
    onToggleDeleteModal,
    onToggleDuplicateModal
  } = props;
  const descendingSortedTemplates = _.orderBy(templates, 'last_update_time', 'desc');

  if (templates.length < 3) {
    return null;
  }

  return (
    <>
      <h2>Recent Activity</h2>

      <div className={styles.RecentActivity} role="list">
        {descendingSortedTemplates.map((template, index) => {
          const version = template.list_status === 'draft' ? 'draft' : 'published';

          { /* Render only the first four items */ }
          if (index <= 3) {
            return (
              <div role="listitem" key={`recent-activity-template-${index}`}>
                <Panel className={styles.RecentActivityPanel} accent>
                  <div className={styles.RecentActivityPanelContent}>
                    <Panel.Section className={styles.RecentActivityStatus}>
                      {(template.list_status === 'published' || template.list_status === 'published_with_draft') ? (
                        <div className={styles.RecentActivityStatus}>
                          <CheckCircle className={styles.RecentActivityPublishedIcon}/>

                          <span className={styles.RecentActivityContent}>Published</span>
                        </div>
                      ) : (
                        <div className={styles.RecentActivityStatus}>
                          <FileEdit className={styles.RecentActivityDraftIcon}/>

                          <span className={styles.RecentActivityContent}>Draft</span>
                        </div>
                      )}
                    </Panel.Section>

                    <Panel.Section className={styles.RecentActivitySection}>
                      <strong>
                        <PageLink to={`/${routeNamespace}/edit/${template.id}/${version}/content${setSubaccountQuery(template.subaccount_id)}`}>
                          {template.name}
                        </PageLink>
                      </strong>
                    </Panel.Section>

                    <div className={styles.RecentActivityMeta}>
                      <div className={styles.RecentActivityDate}>
                        <div>
                          <span>Updated&nbsp;</span>

                          {formatDate(template.last_update_time)}
                        </div>
                      </div>

                      <div className={styles.RecentActivityActions}>
                        <DuplicateAction
                          className={styles.RecentActivityAction}
                          onClick={() => onToggleDuplicateModal(template)}
                          data-id="recent-activity-button-duplicate"
                        />

                        <DeleteAction
                          className={styles.RecentActivityAction}
                          onClick={() => onToggleDeleteModal(template)}
                          data-id="recent-activity-button-delete"
                        />
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default RecentActivity;
