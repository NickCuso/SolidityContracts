const HardlyWeb3 = require("../hardlyWeb3");

module.exports = class ErcExt {
  constructor(isEth, provider) {
    this.hardlyWeb3 = new HardlyWeb3(isEth, provider);
  }

  async _init() {
    const contractJson = require(`../../../artifacts/${
      this.hardlyWeb3.isEth ? "ethereum" : "tron"
    }/Erc20Ext.json`);
    const networkId = await this.hardlyWeb3.web3.eth.net.getId();
    this.contract = this.hardlyWeb3.getContract(
      contractJson.abi,
      contractJson[networkId]
    );
  }

  async balanceAndAllowanceOfAll(user, spender, tokens) {
    await this._init();
    const result = await this.contract.methods
      .balanceAndAllowanceOfAll(user, spender, tokens)
      .call();
    return this.hardlyWeb3.isEth ? result : result.balanceAndAllowancePerToken;
  }
};
