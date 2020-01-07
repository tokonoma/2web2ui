/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, Panel, Button, Grid, UnstyledLink } from '@sparkpost/matchbox';
import styles from './SingleResult.module.scss';
import { withRouter, Link } from 'react-router-dom';
import CodeBlock from './components/CodeBlock';
import {
  ROLE_TOOLTIP,
  DISPOSABLE_TOOLTIP,
  FREE_TOOLTIP,
  DID_YOU_MEAN_TOOLTIP,
  RESULT_DESCRIPTIONS,
} from './constants';
import { singleAddress } from 'src/actions/recipientValidation';
import { showAlert } from 'src/actions/globalAlert';
import Loading from 'src/components/loading';
import Tooltip from './components/Tooltip';

const SINGLE_RV_LINK = '/recipient-validation/single';

export class SingleResult extends Component {
  componentDidMount() {
    const { address, singleAddress, history, showAlert } = this.props;

    singleAddress(address).catch(({ message }) => {
      showAlert({ message, type: 'error' });
      history.push(SINGLE_RV_LINK);
    });
  }

  resultTable = () => {
    const { singleResults = {} } = this.props;
    const { is_role, is_disposable, is_free, did_you_mean } = singleResults;

    return (
      <div className={styles.table}>
        {did_you_mean && (
          <>
            <h6 className={styles.tableKey}>
              Did you mean <Tooltip content={DID_YOU_MEAN_TOOLTIP} />
            </h6>

            <span>{did_you_mean}</span>

            <hr />
          </>
        )}

        <h6 className={styles.tableKey}>
          Role-based <Tooltip content={ROLE_TOOLTIP} />
        </h6>

        <ValueResponse value={is_role} />

        <hr />

        <h6 className={styles.tableKey}>
          Disposable <Tooltip content={DISPOSABLE_TOOLTIP} />
        </h6>

        <ValueResponse value={is_disposable} />

        <hr />

        <h6 className={styles.tableKey}>
          Free <Tooltip content={FREE_TOOLTIP} />
        </h6>

        <ValueResponse value={is_free} />
      </div>
    );
  };

  renderResult = () => {
    const { singleResults = {} } = this.props;
    const { result } = singleResults;

    return (
      <div className={styles.Result}>
        <div>
          <div style={{ marginBottom: '20px', fontWeight: 600 }}>Status:</div>
          <div
            data-id="validation-result-status"
            style={{ textTransform: 'capitalize', fontSize: '2.8em', fontWeight: 550 }}
          >
            {result}
          </div>
        </div>
      </div>
    );
  };

  renderCodeBlock = () => {
    const { singleResults = {} } = this.props;
    const { result, valid, reason, is_role, is_disposable, is_free, did_you_mean } = singleResults;
    return (
      <small className={styles.blue}>
        {'{'}
        <br />
        <TabCharacter />
        "results": {'{'}
        <br />
        {result && (
          <>
            <TabCharacter />
            <TabCharacter />
            "result": "<WhiteText>{result}</WhiteText>",
            <br />
          </>
        )}
        <TabCharacter />
        <TabCharacter />
        "valid": <WhiteText>{valid.toString()}</WhiteText>,<br />
        {reason && (
          <>
            <TabCharacter />
            <TabCharacter />
            "reason": "<WhiteText>{reason}</WhiteText>",
            <br />
          </>
        )}
        <TabCharacter />
        <TabCharacter />
        "is_role": <WhiteText>{is_role.toString()}</WhiteText>,<br />
        <TabCharacter />
        <TabCharacter />
        "is_disposable": <WhiteText>{is_disposable.toString()}</WhiteText>,<br />
        <TabCharacter />
        <TabCharacter />
        "is_free": <WhiteText>{is_free.toString()}</WhiteText>,<br />
        {did_you_mean && (
          <>
            <TabCharacter />
            <TabCharacter />
            "did_you_mean": "<WhiteText>{did_you_mean.toString()}</WhiteText>"<br />
          </>
        )}
        <TabCharacter />
        {'}'}
        <br />
        {'}'}
      </small>
    );
  };

  render() {
    const { singleResults = {}, loading } = this.props;

    if (!singleResults || loading) {
      return <Loading />;
    }

    const { email, result } = singleResults;

    return (
      <Page
        title="Recipient Validation"
        subtitle="Results"
        breadcrumbAction={{ content: 'Back', to: SINGLE_RV_LINK, component: Link }}
      >
        <Panel>
          <Grid>
            <Grid.Column xs={12} md={7}>
              <div style={{ padding: '2rem 2rem 3rem' }}>
                <h2 className={styles.Header}>{email}</h2>
                {this.renderResult()}
                {this.resultTable()}
                <p className={styles.Paragraph} name="result-description">
                  {RESULT_DESCRIPTIONS[result]}
                </p>
                <Button component={Link} color="orange" to={SINGLE_RV_LINK}>
                  Validate Another
                </Button>
              </div>
            </Grid.Column>
            <Grid.Column xs={12} md={5}>
              <CodeBlock preformatted>
                <div style={{ padding: '2rem' }}>
                  <div className={styles.apiHeader}>Raw API Response</div>
                  <p className={styles.ApiDescription}>
                    <WhiteText>
                      The following raw API results outline the reasons for your email's validation
                      status. Learn how to
                      <UnstyledLink
                        external
                        to="https://developers.sparkpost.com/api/recipient-validation/"
                        style={{ color: 'white', fontWeight: '800' }}
                      >
                        {' '}
                        integrate with Recipient Validation{' '}
                      </UnstyledLink>{' '}
                      in your product.
                    </WhiteText>
                  </p>
                  <pre>{this.renderCodeBlock()}</pre>
                </div>
              </CodeBlock>
            </Grid.Column>
          </Grid>
        </Panel>
      </Page>
    );
  }
}

function TabCharacter() {
  return <span className={styles.tab} />;
}

function WhiteText({ children }) {
  return <span className={styles.white}>{children}</span>;
}

function ValueResponse({ value }) {
  return (
    <span
      data-id="validation-result-value"
      className={value ? styles.redBoolean : styles.greenBoolean}
    >
      {value ? 'Yes' : 'No'}
    </span>
  );
}

const mapStateToProps = ({ recipientValidation }, { match }) => ({
  singleResults: recipientValidation.singleResults,
  loading: recipientValidation.loading,
  address: match.params.email,
});

export default withRouter(connect(mapStateToProps, { singleAddress, showAlert })(SingleResult));
