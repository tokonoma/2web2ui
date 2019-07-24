import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Panel } from '@sparkpost/matchbox';
import ReportRow from './CustomReportRow';

export function CustomReportsList({ deleting, handleLoad, onDelete, reports, setName }) {
  const [open, setOpen] = React.useState(false);

  const reportList = React.useMemo(() => {
    if (!reports.length) {
      return (
        <Panel.Section>
          You do not have any saved reports.
        </Panel.Section>
      );
    }

    return reports.map((report, i) => {

      function onLoad() {
        setOpen(false);
        handleLoad(report);
      }

      return (
        <ReportRow
          key={`${report.name}-${i}`}
          {...report}
          onLoad={onLoad}
          onDelete={onDelete}
          deleting={deleting}
        />
      );
    });
  }, [deleting, handleLoad, onDelete, reports]);

  return (
    <>
      <Button
        flat
        color='orange'
        size='small'
        onClick={() => setOpen(!open)}>
          Saved Reports
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Panel title='Saved Reports'>
            {reportList}
          </Panel>
        </div>
      </Modal>
    </>
  );
}


export default withRouter(CustomReportsList);
