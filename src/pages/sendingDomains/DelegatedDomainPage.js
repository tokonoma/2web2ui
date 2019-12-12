import React from 'react';
import './hack.css';
import { Button, TextField, Select, Panel } from '@sparkpost/matchbox';
import { connect } from 'react-redux';
import * as actions from 'src/actions/delegatedDomains';
import { Page } from '@sparkpost/matchbox';
import { Banner } from '@sparkpost/matchbox';
import useRouter from 'src/hooks/useRouter';

const DelegatedDomainPage = ({ delegatedDomain, getDomain, updateDomainRecords }) => {
  const {
    requestParams: { id },
  } = useRouter();

  React.useEffect(() => {
    getDomain(id);
  }, [getDomain, id]);

  function getDataRows() {
    console.log('getDataRows', delegatedDomain);

    if (!delegatedDomain) {
      return null;
    }

    console.log('delegatedDomain', delegatedDomain);

    return delegatedDomain.records.map((item, index) => {
      return (
        <tr key={item.name + item.type + index}>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.ttl}</td>
          <td style={{ width: 400 }}>{item.data}</td>
          {/* conditionally show edit text based on type - NS doens't get it */}
          <td style={{ textAlign: 'end', width: 170 }}>
            <Button outline size="small">
              delete
            </Button>
            &nbsp;
            <Button outline size="small">
              edit
            </Button>
          </td>
        </tr>
      );
    });
  }

  // const action = {
  //   content: 'Learn more.',
  //   to: LINKS.SENDING_REQS,
  //   external: true,
  // };

  return (
    <Page title="Delgated Sending Domains">
      {/* action={action} */}
      <Banner status="info" title="We'll be your DNS daddy, but here's the deal...">
        <h5 style={{ marginTop: 15, marginBottom: 0 }}>Records we manage:</h5>
        <p style={{ margin: 0 }}>A IP</p>
        <p style={{ margin: 0 }}>MX name</p>
        <p style={{ margin: 0 }}>NS hostnames</p>
        <p style={{ margin: 0 }}>TXT SPF</p>
        <h5 style={{ marginTop: 15, marginBottom: 0 }}>Records you manage:</h5>
        <p style={{ margin: 0 }}>A IP</p>
        <p style={{ margin: 0 }}>TXT Not SPF</p>
        <p style={{ margin: 0 }}>CNAME any but @</p>
      </Banner>
      <h1>Custom records</h1>
      <div id="dns-container">
        <div id="new">
          <TextField name="" placeholder={'@'} />
          <Select id="id" options={['A', 'TXT', 'CNAME']} />
          <TextField name="" placeholder={'1H'} />
          <TextField name="" placeholder={'IPv4 Address'} />
          <Button style={{ marginBottom: 20 }} type="button">
            Add
          </Button>
        </div>
        <Panel>
          <table id="dns" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>TTL</th>
                <th style={{ width: 400 }}>Data</th>
                <th style={{ width: 170 }}></th>
              </tr>
            </thead>
            <tbody>{getDataRows()}</tbody>
          </table>
        </Panel>
      </div>
    </Page>
  );
};

const mSTP = (state, props) => {
  return {
    delegatedDomain: state.delegatedDomains[props.match.params.id],
  };
};

// export default DelegatedDomainPage;
export default connect(mSTP, actions)(DelegatedDomainPage);
