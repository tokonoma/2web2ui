import React, { Component } from 'react';
import { EmptyState } from '@sparkpost/matchbox';
import { Generic } from 'src/components/images';
import ErrorTracker from 'src/helpers/errorTracker';
import { DEFAULT_REDIRECT_ROUTE } from '../../constants';


export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });

    // Must manually report errors because componentDidCatch() is
    // analogous to a catch clause in production builds.
    ErrorTracker.report('error-boundary', error);
  }

  handleCtaClick = () => {
    window.location.replace(DEFAULT_REDIRECT_ROUTE); //deliberately using native location to avoid any potential problem with react router itself
  }

  render() {
    const primaryAction = {
      content: this.props.ctaLabel || 'Go Back',
      onClick: this.props.onCtaClick || this.handleCtaClick
    };

    if (this.state.hasError) {
      return <div style={{ margin: '0 auto', maxWidth: 1080 }}>
        <EmptyState
          title='Sorry, something went wrong'
          image={Generic}
          primaryAction={primaryAction}
        >
          <p>We're having some technical issues. Our engineers have been notified and are working on getting this fixed.</p>
        </EmptyState>
      </div>;
    }

    return this.props.children;
  }
}
