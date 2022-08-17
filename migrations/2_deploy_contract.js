const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const Bank = artifacts.require("Bank");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(Bank, rwd.address, tether.address);
  const bank = await Bank.deployed();

  await rwd.transfer(bank.address, "1000000000000000000000000");

  await tether.transfer(accounts[1], "100000000000000000000");
};
