const Insurance = artifacts.require("Insurance");

module.exports = async function (deployer, network, accounts) {
  // Deploy the Insurance contract without passing parameters
  await deployer.deploy(Insurance);

  const insuranceInstance = await Insurance.deployed();

  console.log("Insurance contract deployed at address:", insuranceInstance.address);
};