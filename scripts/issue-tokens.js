const bank = artifacts.require("Bank");

module.exports = async function issueRewards(callback) {
  let theBank = await bank.deployed();
  await theBank.issueTokens();
  console.log("Tokens have been issued successfully");
  callback();
};
