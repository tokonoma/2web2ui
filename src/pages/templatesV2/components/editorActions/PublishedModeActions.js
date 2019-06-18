import React from 'react';
import { Button, Popover } from '@sparkpost/matchbox';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import styles from './Actions.module.scss';
// import Duplicate from './Duplicate';
import EditDraft from './EditDraft';

const PublishedModeActions = () => (
  <div>
    <EditDraft className={styles.Actions}>
      <Button><strong>Edit Draft</strong></Button>
    </EditDraft>

    <div className={styles.Actions}>
      <Popover
        left={true}
        trigger={<Button><ArrowDropDown/></Button>}
      >
        <div>
          <EditDraft className={styles.ActionItem}/>
          {/*<Duplicate className={styles.ActionItem}/>*/}
        </div>
      </Popover>
    </div>
  </div>
);

export default PublishedModeActions;
