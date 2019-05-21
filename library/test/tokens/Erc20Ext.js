module.exports = function(library, accounts, tokens) {
  describe("Erc20Ext", () => {
    it("can read balances", async () => {
      console.log(accounts[0]);
      console.log(accounts[9]);
      console.log(tokens);
      console.log(library);
      const balances = await library.balanceAndAllowanceOfAll(
        accounts[0],
        accounts[9],
        tokens
      );
      for (let iToken = 0; iToken < tokens.length; iToken++) {
        assert.equal(balances[iToken * 2].toString(), 5 + iToken);
        assert.equal(
          balances[iToken * 2 + 1].toString(),
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        );
      }
    });
  });
};
