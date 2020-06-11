import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import getConfig from 'src/helpers/getConfig';
import useRouter from 'src/hooks/useRouter';

const api = axios.create({
  baseURL: 'https://drbgqnye23.execute-api.us-east-1.amazonaws.com/tst',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

class Client {
  events = [];
  isReady = false;

  post() {
    while (this.events.length) {
      const event = this.events.pop();

      api.post('/activity', {
        ...this.identity,
        tenant_id: 'spc', // :(
        ...event,
      });
    }
  }

  report(event) {
    this.events.push(event);

    if (this.identity) {
      this.post();
    }
  }

  setIdentity(identity) {
    this.identity = identity;
    this.post();
  }
}

const client = new Client();

const Timestream = props => {
  const {
    location: { pathname },
  } = useRouter();

  // report pageviews
  React.useEffect(() => {
    client.report({
      // todo,
      // ip: "1.2.3.18",

      service: 'Metrics',
      origin: 'ui',
      type: 'pageview',
      detail: pathname,

      //   // extra
      //   // release: getConfig('release')
      //   // isTestAccount: props.currentUser.email looks like (messagesystems|parkpost).com
      //   return state;
      // };
    });
  }, [pathname]);

  // report clicks
  // report errors
  // report xhr

  // set account information
  React.useEffect(() => {
    const identity = {
      tenant_id: getConfig('tenantId'),
      customer_id: props.account.customer_id,
      // see, selectors/currentUser.js usernameSelector
      user_id: props.currentUser.username || props.tfa.username,
    };

    if (identity.tenant_id && identity.customer_id && identity.user_id) {
      client.setIdentity(identity);
    }
  }, [
    props.account.customer_id,
    props.currentUser.username,
    props.tfa.username,
    props.auth.username,
  ]);

  React.useEffect(() => {
    document.addEventListener(
      'click',
      e => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          client.report({
            service: 'Metrics',
            origin: 'ui',
            type: 'click',
            detail: `Click on a ${e.target.tagName}.${e.target.className}`,
          });
        }
      },
      {
        passive: true,
      },
    );

    return () => {
      document.removeEventListener('click');
    };
  }, []);

  React.useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/Events
    const events = [
      // Resource events
      'error', //	A resource failed to load.
      'abort', // The loading of a resource has been aborted.
      'load', // A resource and its dependent resources have finished loading.
      'beforeunload', // The window, the document and its resources are about to be unloaded.
      'unload', // The document or a dependent resource is being unloaded.

      // Network events
      'online', // The browser has gained access to the network.
      'offline', // The browser has lost access to the network.

      // WebSocket events
      'focus', //	An element has received focus (does not bubble).
      'blur', // An element has lost focus (does not bubble).
      'focusin', //	An element is about to receive focus (does bubble).
      'focusout', // An element is about to lose focus (does bubble).

      // Session History events
      'pagehide', // A session history entry is being traversed from.
      'pageshow', // A session history entry is being traversed to.
      'popstate', // A session history entry is being navigated to (in certain cases).

      // CSS Animation events
      'animationstart', // A CSS animation has started.
      'animationcancel', // A CSS animation has aborted.
      'animationend', // A CSS animation has completed.
      'animationiteration', // A CSS animation is repeated.

      'DOMContentLoaded',
    ];

    events.forEach(event => {
      document.addEventListener(event, e => {
        // console.log(event, e);
      });
    });

    return () => {
      events.forEach(event => {
        // document.removeEventListener(event);
      });
    };
  }, []);

  return null;
};

export default connect(state => state)(Timestream);
