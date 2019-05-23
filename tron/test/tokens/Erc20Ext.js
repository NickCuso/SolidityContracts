const TestTrc20 = artifacts.require("TestTrc20");
const deploy = require("../../../library/src/deploy");
const Library = require("../../../library/src/tokens/Erc20Ext");
const Test = require("../../../library/test/tokens/Erc20Ext");
const sleep = require("sleep");

contract("Erc20Ext", accounts => {
  const tokens = [];

  before(async () => {
    await deploy.deploy(false, accounts[0], [tronWeb]);
    return;
    Test.library = new Library(false, tronWeb);
    for (let iToken = 0; iToken < 1; iToken++) {
      const token = await TestTrc20.deployed();
      sleep.sleep(3);
      tokens.push(token.address);
      await token.mint(accounts[0], 5 + iToken);
      await token.approve(
        accounts[9],
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );
    }
  });

  describe("test", () => {
    Test.Erc20Ext(accounts, tokens);
  });
});
