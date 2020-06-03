import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'src/components/matchbox';
import {
  getAccountSingleSignOnDetails,
  updateAccountSingleSignOn,
} from 'src/actions/accountSingleSignOn';
import { ExternalLink } from 'src/components/links';
import { PanelLoading } from 'src/components/loading';
import { LINKS } from 'src/constants';
import ProviderSection from './ProviderSection';
import StatusSection from './StatusSection';
import SCIMTokenSection from './SCIMTokenSection';
import { PANEL_LOADING_HEIGHT } from 'src/pages/account/constants';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { listApiKeys } from 'src/actions/api-keys';
import generateScimToken, { resetScimTokenStatus } from 'src/actions/generateScimToken';

export function SingleSignOnPanel(props) {
  const {
    getAccountSingleSignOnDetails,
    provider,
    tfaRequired,
    isSsoScimUiEnabled,
    loading,
    listApiKeys,
    apiKeys,
    generateScimToken,
    scimTokenStatus,
  } = props;
  useEffect(() => {
    getAccountSingleSignOnDetails();
  }, [getAccountSingleSignOnDetails]);
  //TODO: grant here may need needs to be updated
  useEffect(() => {
    if (isSsoScimUiEnabled) {
      listApiKeys(null, { grant: 'scim/manage' });
    }
  }, [isSsoScimUiEnabled, listApiKeys]);

  const renderContent = () => {
    return (
      <React.Fragment>
        {tfaRequired && (
          <p>
            Single sign-on is not available while two-factor authentication is required on this
            account.
          </p>
        )}
        <ProviderSection readOnly={tfaRequired} provider={provider} />
        <StatusSection readOnly={tfaRequired} {...props} />
        {/*TODO: prop passed as apiKey may need to be updated once the backend is ready :shrug: */}
        {isSsoScimUiEnabled && (
          <SCIMTokenSection
            apiKey={apiKeys.keys[0] || {}}
            generateScimToken={generateScimToken}
            resetScimTokenStatus={resetScimTokenStatus}
            listApiKeys={listApiKeys}
            scimTokenStatus={scimTokenStatus}
          />
        )}
      </React.Fragment>
    );
  };

  if (loading) {
    return <PanelLoading minHeight={PANEL_LOADING_HEIGHT} />;
  }

  return (
    <Panel
      title="Single Sign-On"
      actions={[
        {
          color: 'orange',
          component: ExternalLink,
          content: 'Learn More',
          to: LINKS.SSO_GUIDE,
        },
      ]}
    >
      {renderContent()}
    </Panel>
  );
}

const mapDispatchToProps = {
  getAccountSingleSignOnDetails,
  updateAccountSingleSignOn,
  listApiKeys,
  generateScimToken,
};

const mapStateToProps = state => ({
  ...state.accountSingleSignOn,
  tfaRequired: state.account.tfa_required,
  isSsoScimUiEnabled: isAccountUiOptionSet('sso_scim_section')(state),
  apiKeys: state.apiKeys,
  scimTokenStatus: state.generateScimToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSignOnPanel);
