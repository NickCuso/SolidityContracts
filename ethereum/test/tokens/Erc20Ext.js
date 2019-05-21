const Erc20Ext = artifacts.require("Erc20Ext");
const TestErc20 = artifacts.require("TestErc20");
const deploy = require("../../../library/src/deploy");
const Library = require("../../../library/src/tokens/Erc20Ext");
const TestErc20Ext = require("../../../library/test/tokens/Erc20Ext");

contract("Erc20Ext", accounts => {
  let library;
  let contract;
  const tokens = [];

  beforeEach(async () => {
    await deploy.deploy(true, accounts[0], [web3.currentProvider]);
    contract = await Erc20Ext.new();
    library = new Library(true, web3.currentProvider, contract.address);
    for (let iToken = 0; iToken < 20; iToken++) {
      const token = await TestErc20.new();
      tokens.push(token.address);
      await token.mint(accounts[0], 5 + iToken);
      await token.approve(accounts[9], -1);
    }
  });

  it("should function", () => {
    TestErc20Ext(library, accounts, tokens);
  });
});
