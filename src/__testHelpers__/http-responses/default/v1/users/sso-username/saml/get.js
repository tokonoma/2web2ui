export default ({ url }) => ({
  results: { saml: /\/v1\/users\/sso-username\/saml$/.test(url) }
});
