const Karachiite_Contract = artifacts.require("Karachiite");
const Counters_Contract = artifacts.require("Counters");


module.exports = function (deployer) {
  deployer.deploy(Counters_Contract);
  deployer.link(Counters_Contract, Karachiite_Contract);
  deployer.deploy(Karachiite_Contract);
};
