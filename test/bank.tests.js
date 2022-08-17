const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const Bank = artifacts.require("Bank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Bank", ([owner, customer]) => {
  let tether, rwd, bank;

  const tokens = (number) => {
    return web3.utils.toWei(number, "ether");
  };

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    bank = await Bank.new(rwd.address, tether.address);

    await rwd.transfer(bank.address, tokens("1000000"));
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("Reward Token", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Bank", async () => {
    it("matches name successfully", async () => {
      const name = await bank.name();
      assert.equal(name, "Bank");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(bank.address);
      assert.equal(balance, tokens("1000000"));
    });

    describe("Yield farming", async () => {
      it("rewards token for staking", async () => {
        let result;

        result = await tether.balanceOf(customer);

        assert.equal(
          result.toString(),
          tokens("100"),
          "Customer mock wallet before staking 100 tokens"
        );

        await tether.approve(bank.address, tokens("100"), { from: customer });
        await bank.depositTokens(tokens("100"), { from: customer });

        result = await tether.balanceOf(customer);

        assert.equal(
          result.toString(),
          tokens("0"),
          "Customer mock wallet after staking 100 tokens"
        );

        result = await tether.balanceOf(bank.address);

        assert.equal(
          result.toString(),
          tokens("100"),
          "Bank mock wallet balance after staking from customer"
        );

        result = await bank.isStaked(customer);
        assert.equal(result.toString(), "true", "Staked is true");

        await bank.issueTokens({ from: owner });

        await bank.issueTokens({ from: customer }).should.be.rejected;

        await bank.unstakeTokens({ from: customer });

        await bank.unstakeTokens({ from: owner }).should.be.rejected;

        result = await tether.balanceOf(customer);

        assert.equal(
          result.toString(),
          tokens("100"),
          "Customer mock wallet after unstaking"
        );

        result = await tether.balanceOf(bank.address);

        assert.equal(
          result.toString(),
          tokens("0"),
          "Bank mock wallet balance after unstaking of customer"
        );

        result = await bank.isStaked(customer);
        assert.equal(result.toString(), "false", "Staked is false");
      });
    });
  });
});
