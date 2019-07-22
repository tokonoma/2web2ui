import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Panel } from '@sparkpost/matchbox';
import ReportRow from './CustomReportRow';


function CustomReportsList({ deleting, reports, history, onDelete, setName }) {
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

      function handleLoad() {
        setOpen(false);
        history.push(`/reports/summary/?${report.url}`);
        setName(report.name);
      }

      return (
        <ReportRow
          key={`${report.name}-${i}`}
          {...report}
          onLoad={handleLoad}
          onDelete={onDelete}
          deleting={deleting}
        />
      );
    });
  }, [deleting, history, onDelete, reports, setName]);

  return (
    <>
      <Button
        flat
        color='orange'
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
