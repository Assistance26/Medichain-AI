const UserAuth = artifacts.require("UserAuth");

module.exports = function(deployer) {
  deployer.deploy(UserAuth);
};
