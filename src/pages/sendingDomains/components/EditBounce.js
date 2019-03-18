import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyCname, update } from 'src/actions/sendingDomains';

import { Panel, Banner, Tooltip } from '@sparkpost/matchbox';
import { Help } from '@sparkpost/matchbox-icons';
import ToggleBlock from 'src/components/toggleBlock/ToggleBlock';
import { LabelledValue } from 'src/components';
import { showAlert } from 'src/actions/globalAlert';
import { SendingDomainSection } from './SendingDomainSection';
import { resolveReadyFor } from 'src/helpers/domains';
import getConfig from 'src/helpers/getConfig';
import { hasAutoVerifyEnabledSelector } from 'src/selectors/account';
import SetupInstructionPanel from './SetupInstructionPanel';

export class EditBounce extends Component {

  verifyDomain = () => {
    const { id, verifyCname, showAlert, domain: { subaccount_id: subaccount }} = this.props;

    return verifyCname({ id, subaccount })
      .then((results) => {
        const readyFor = resolveReadyFor(results);
        if (readyFor.bounce) {
          showAlert({ type: 'success', message: `You have successfully verified CNAME record of ${id}` });
        } else {
          showAlert({ type: 'error', message: `Unable to verify CNAME record of ${id}. ${results.dns.cname_error}` });
        }
      });
  }

  toggleDefaultBounce = () => {
    const { id, update, domain, reset } = this.props;

    return update({
      id,
      subaccount: domain.subaccount_id,
      is_default_bounce_domain: !domain.is_default_bounce_domain
    }).catch((err) => {
      // TODO: Switch this single field form to use ToggleBlock without Redux Form and set the value
      //   of the toggle from the store value, so this catch can be removed
      reset();
      throw err; // for error reporting
    });
  }

  renderRootDomainWarning() {
    const { id } = this.props;
    const host = id.split('.');
    if (host.length >= 3) {
      return null;
    }

    return (
      <Banner status="warning">
        We strongly recommend using a subdomain such as <strong>bounces.{id}</strong> for bounce domains. <Link to={'/account/sending-domains/create'}>Create a new domain now.</Link>
      </Banner>
    );
  }

  renderDnsSettings() {
    const { id, domain, hasAutoVerifyEnabled, verifyCnameLoading } = this.props;
    const readyFor = resolveReadyFor(domain.status);
    const bounceDomainsConfig = getConfig('bounceDomains');

    return (
      <SetupInstructionPanel
        isAutoVerified={hasAutoVerifyEnabled}
        isVerified={readyFor.bounce}
        isVerifying={verifyCnameLoading}
        onVerify={this.verifyDomain}
        recordType="CNAME"
        verifyButtonIdentifier="verify-cname"
      >
        <LabelledValue label='Type'><p>CNAME</p></LabelledValue>
        <LabelledValue label='Hostname'><p>{id}</p></LabelledValue>
        <LabelledValue label='Value'><p>{bounceDomainsConfig.cnameValue}</p></LabelledValue>
      </SetupInstructionPanel>
    );
  }

  renderNotReady() {
    return (
      <Fragment>
        <SendingDomainSection.Left>
          <p>
            To use this domain for bounces, connect your domain by setting the required DNS record(s)
            and verifying the connection.
          </p>
        </SendingDomainSection.Left>
        <SendingDomainSection.Right>
          {this.renderRootDomainWarning()}
          {this.renderDnsSettings()}
        </SendingDomainSection.Right>
      </Fragment>
    );
  }

  renderReady() {
    const { updateLoading, id, domain } = this.props;
    const readyFor = resolveReadyFor(domain.status);
    const bounceDomainsConfig = getConfig('bounceDomains');

    // Allow default bounce toggle if:
    // Config flag is true
    // Domain is verified
    // Domain is ready for bounce
    // Bounce domain by subaccount config flag is true
    const showDefaultBounceSubaccount = (!domain.subaccount_id || domain.subaccount_id && bounceDomainsConfig.allowSubaccountDefault);
    const showDefaultBounceToggle = bounceDomainsConfig.allowDefault && readyFor.sending && readyFor.bounce && showDefaultBounceSubaccount;

    const tooltip = (
      <Tooltip dark content={`When this is set to "ON", all future transmissions ${domain.subaccount_id ? 'for this subaccount ' : ''}will use ${id} as their bounce domain (unless otherwise specified).`}>
        Default bounce domain {domain.subaccount_id && ` for Subaccount ${domain.subaccount_id}`}
        <Help size={15}/>
      </Tooltip>
    );

    return (
      <Fragment>
        <SendingDomainSection.Left/>
        <SendingDomainSection.Right>
          {this.renderRootDomainWarning()}
          {this.renderDnsSettings()}
          {showDefaultBounceToggle &&
              <Panel sectioned>
                <Field
                  name='is_default_bounce_domain'
                  component={ToggleBlock}
                  label={tooltip}
                  type='checkbox'
                  parse={(value) => !!value} // Prevents unchecked value from equaling ""
                  disabled={updateLoading}
                  onChange={this.toggleDefaultBounce}
                />
              </Panel>
          }
        </SendingDomainSection.Right>
      </Fragment>
    );
  }

  render() {
    const { domain } = this.props;
    const readyFor = resolveReadyFor(domain.status);

    return (
      <SendingDomainSection title='Set Up For Bounce'>
        {readyFor.bounce ? this.renderReady() : this.renderNotReady()}
      </SendingDomainSection>
    );
  }
}

const formOptions = {
  form: 'sendingDomainBounce',
  enableReinitialize: true // required to update initial values from redux state
};

const mapStateToProps = (state, { domain }) => ({
  hasAutoVerifyEnabled: hasAutoVerifyEnabledSelector(state),
  updateLoading: state.sendingDomains.updateLoading,
  verifyCnameLoading: state.sendingDomains.verifyCnameLoading,
  initialValues: {
    ...domain
  }
});

export default connect(mapStateToProps, { verifyCname, update, showAlert })(reduxForm(formOptions)(EditBounce));
