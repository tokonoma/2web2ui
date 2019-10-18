import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import { FileEdit, CheckCircle } from '@sparkpost/matchbox-icons';
import { DisplayDate } from 'src/components';
import { DuplicateAction, DeleteAction } from './ListComponents';
import styles from './RecentActivity.module.scss';

const RecentActivity = (props) => {
  const { templates, onToggleDeleteModal, onToggleDuplicateModal } = props;
  const descendingSortedTemplates = templates.sort((a, b) => new Date(b.last_update_time) - new Date(a.last_update_time));

  return (
    <>
      <h2>Recent Activity</h2>

      <div className={styles.RecentActivity}>
        {descendingSortedTemplates.map((template, index) => {
          { /* Render only the first four items */ }
          if (index <= 3) {
            return (
              <Panel
                className={styles.RecentActivityPanel}
                accent
                key={`recent-activity-template-${index}`}
              >
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
                    <strong>{template.name}</strong>
                  </Panel.Section>

                  <div className={styles.RecentActivityMeta}>
                    <div className={styles.RecentActivityDate}>
                      <span>Updated&nbsp;</span>

                      <DisplayDate
                        timestamp={template.last_update_time}
                        formattedDate={template.last_update_time}
                      />
                    </div>

                    <div className={styles.RecentActivityActions}>
                      <DuplicateAction onClick={() => onToggleDuplicateModal(template)}/>

                      <DeleteAction onClick={() => onToggleDeleteModal(template)}/>
                    </div>
                  </div>
                </div>
              </Panel>
            );
          }
        })}
      </div>
    </>
  );
};

export default RecentActivity;
