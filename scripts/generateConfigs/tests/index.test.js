const generateConfigs = require("../index");
const tenants = require("../tenants");
const constructContent = require("../constructContent");

jest.mock("../tenants", () => ({
  production: {
    "tenant1": {},
    "tenant2": {nextHost: 'tenant2.next.sparkpost.com'},
    "tenant3": {originHost: 'tenant3.origin.sparkpost.com'},
    "tenantN": {}
  }
}));

jest.mock("../constructContent", () => {
  return function({ host, nextHost, originHost, tenantId, ...config }) {
    return {
      host: `${tenantId}.sparkpost.com`,
      apiBase: `http://${tenantId}.sparkpost.com/api`
    };
  };
});

describe("generateConfigs", () => {
  it("returns combined configs", () => {
    const configs = generateConfigs();
    expect(configs).toMatchSnapshot();
  });
});
