import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, Panel, Button, Grid, UnstyledLink } from '@sparkpost/matchbox';
import styles from './SingleResult.module.scss';
import { withRouter, Link } from 'react-router-dom';
import CodeBlock from './components/CodeBlock';
import { WarningIcon, SuccessIcon, ErrorIcon } from './components/icons';
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

const Tab = () => <span className={styles.tab} />;
const White = ({ children }) => <span className={styles.white}>{children}</span>;

const valueResponse = value =>
  value ? (
    <span className={styles.redBoolean}>Yes</span>
  ) : (
    <span className={styles.greenBoolean}>No</span>
  );

const ICONS = {
  undeliverable: <ErrorIcon />,
  valid: <SuccessIcon />,
  risky: <WarningIcon />,
};

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
        {valueResponse(is_role)}
        <hr />
        <h6 className={styles.tableKey}>
          Disposable <Tooltip content={DISPOSABLE_TOOLTIP} />
        </h6>
        {valueResponse(is_disposable)}
        <hr />
        <h6 className={styles.tableKey}>
          Free <Tooltip content={FREE_TOOLTIP} />
        </h6>
        {valueResponse(is_free)}
      </div>
    );
  };

  renderResult = () => {
    const { singleResults = {} } = this.props;
    const { valid, result = valid ? 'valid' : 'undeliverable' } = singleResults;

    return (
      <div className={styles.Result}>
        <div style={{ marginRight: '15px' }}>{ICONS[result]}</div>
        <div>
          <div style={{ marginBottom: '20px', fontWeight: 600 }}>Status:</div>
          <div style={{ textTransform: 'capitalize', fontSize: '2.8em', fontWeight: 550 }}>
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
        <Tab />
        "results": {'{'}
        <br />
        {result && (
          <>
            <Tab />
            <Tab />
            "result": "<White>{result}</White>",
            <br />
          </>
        )}
        <Tab />
        <Tab />
        "valid": <White>{valid.toString()}</White>,<br />
        {reason && (
          <>
            <Tab />
            <Tab />
            "reason": "<White>{reason}</White>",
            <br />
          </>
        )}
        <Tab />
        <Tab />
        "is_role": <White>{is_role.toString()}</White>,<br />
        <Tab />
        <Tab />
        "is_disposable": <White>{is_disposable.toString()}</White>,<br />
        <Tab />
        <Tab />
        "is_free": <White>{is_free.toString()}</White>,<br />
        {did_you_mean && (
          <>
            <Tab />
            <Tab />
            "did_you_mean": "<White>{did_you_mean.toString()}</White>"<br />
          </>
        )}
        <Tab />
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
                    <White>
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
                    </White>
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

const mapStateToProps = ({ recipientValidation }, { match }) => ({
  singleResults: recipientValidation.singleResults,
  loading: recipientValidation.loading,
  address: match.params.email,
});

export default withRouter(connect(mapStateToProps, { singleAddress, showAlert })(SingleResult));
