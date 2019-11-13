/* eslint-disable */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, formValueSelector, getFormValues, reduxForm, submit } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Button, Panel, Label } from '@sparkpost/matchbox';
import { SelectWrapper, RadioGroup } from 'src/components/reduxFormWrappers';
import { ConfirmationModal } from 'src/components';
import { Card, CardTitle, CardContent } from 'src/components/card';
import ExternalLink from 'src/components/externalLink';
import ButtonWrapper from 'src/components/buttonWrapper';
import {
  getIpPools,
  selectCurrentPool,
  selectIpForCurrentPool,
  selectIpFormInitialValues
} from 'src/selectors/ipPools';
import styles from './IpForm.module.scss';

const formName = 'ipForm';

const IpFormV2 = (props) => {
  const {
    ip,
    pool,
    pools,
    isAutoWarmupEnabled,
    handleSubmit,
    submitting,
    pristine
  } = props;
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const reAssignPoolsOptions = pools.map((currentPool) => ({
    value: currentPool.id,
    label: (currentPool.id === pool.id) ? '-- Select a new pool --' : `${currentPool.name} (${currentPool.id})`
  }));

  const handleConfirmClick = () => {
    setConfirmationModalOpen(false);
    submit(formName);
  };

  const handleUpdateSendingIPClick = () => {
    const isEnabling = isAutoWarmupEnabled && !ip.auto_warmup_enabled;
    const isDisabling = !isAutoWarmupEnabled && ip.auto_warmup_enabled;

    if (isEnabling || isDisabling) {
      setConfirmationModalOpen(true);

      return false;
    }

    return submit(formName);
  };

  return (
    <Panel title="Sending IP Details">
      <form onSubmit={handleSubmit}>
        <Panel.Section>
          <div className={styles.FieldGroup}>
            <Label>Hostname</Label> {/* NOTE: This should not be using the HTML <label> element - just a <div> with the same styles. This is a limitation of the existing component */}

            <p>{ip.hostname}</p>
          </div>

          <div className={classNames(styles.MaxWidthSM, styles.FieldGroup)}>
            <Label id="ip_pool">Reassign IP Pool</Label>

            <Field
              name="ip_pool"
              component={SelectWrapper}
              options={reAssignPoolsOptions}
              disabled={submitting}
            />
          </div>

          <div className={styles.FieldGroup}>
            <Label>Auto IP Warmup</Label> {/* NOTE: This *should* be a `<legend>` inside of a `<fieldset>` */}

            <Field
              name="auto_warmup_enabled"
              component={RadioGroup}
              options={[
                {
                  label: <strong>Auto IP Warmup</strong>,
                  value: 'true',
                  helpText: (
                    <div className={styles.MaxWidthMD}>
                      <p className={styles.RadioParagraph}>Standard warmup involves gradually increasing the amount of traffic to the gold IP each day based on a pre-determined schedule. Traffic exceeding the daily limit will be directed to other IPs in the same pool and then to the overflow pool you designate.</p>

                      <div className={styles.WarmupDocLink}>
                        <ExternalLink to="https://www.sparkpost.com/docs/user-guide/automated-ip-warmup/">Warmup Documentation</ExternalLink>
                      </div>
                    </div>
                  )
                },
                {
                  label: <strong>Do Not Throttle for Warmup</strong>,
                  value: 'false',
                  helpText: <p className={classNames(styles.RadioParagraph, styles.MaxWidthMD)}>This IP will not be throttled for the purposes of IP warmup. Use this option if your IP is already warm or if you're planning to use your own warmup methods.</p>
                }
              ]}
              disabled={submitting}
            />
          </div>

          {/* eslint-disable no-restricted-syntax */}
          <div className={styles.MaxWidthMD}>
            <Card>
              <CardTitle>Engagement Based IP Warmup</CardTitle>

              <CardContent>
                <p className={styles.CardParagraph}>This feature exists for accounts with a <abbr title="Customer Success Manager">CSM</abbr> or dedicated <abbr title="Technical Account Manager">TAM</abbr>. We will automatically bind highly engaged traffic to your cold IP to give it the best chance of warming up. To learn more, <ExternalLink to="https://www.sparkpost.com/docs/user-guide/automated-ip-warmup/">click here</ExternalLink>.</p>
              </CardContent>
            </Card>
          </div>
          {/* eslint-enable no-restricted-syntax */}
        </Panel.Section>

        <Panel.Section>
          <ButtonWrapper>
            <Button primary disabled={submitting || pristine} onClick={handleUpdateSendingIPClick}>
              Update Sending IP
            </Button>
          </ButtonWrapper>
        </Panel.Section>
      </form>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title={`Are you sure you want to ${isAutoWarmupEnabled ? 'enable' : 'disable'} Auto IP Warmup?`}
        content={
          isAutoWarmupEnabled ? (
            <p>Enabling Auto IP Warmup will limit the amount of traffic that you can send over this IP based on the warmup stage. Remaining traffic will be distributed amongst other IPs in the same pool or the designated overflow pool.</p>
          ) : (
            <p>Disabling Auto IP Warmup will remove the volume restrictions from this IP. If this IP is not properly warmed, this can have negative consequences on your deliverability and sender reputation.</p>
          )
        }
        onCancel={() => setConfirmationModalOpen(false)}
        onConfirm={handleConfirmClick}
        confirmVerb={isAutoWarmupEnabled ? 'Yes, I want to turn ON Auto IP Warmup' : 'Yes, I want to turn OFF Auto IP Warmup'}
      />
    </Panel>
  );
};

const valueSelector = formValueSelector(formName);
const mapStateToProps = (state, props) => ({
  pool: selectCurrentPool(state, props),
  ip: selectIpForCurrentPool(state, props),
  pools: getIpPools(state, props),
  initialValues: selectIpFormInitialValues(state, props),
  isAutoWarmupEnabled: valueSelector(state, 'auto_warmup_enabled'),
  formValues: getFormValues(formName)(state)
});

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const connectedForm = withRouter(connect(mapStateToProps, { submit })(reduxForm(formOptions)(IpFormV2)));
connectedForm.displayName = 'IpForm';
export default connectedForm;
