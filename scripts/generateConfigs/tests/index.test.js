const generateConfigs = require("../index");

describe("generateConfigs", () => {
  it("returns combined configs", () => {
    const configs = generateConfigs();
    expect(configs).toMatchSnapshot();
  });
});
