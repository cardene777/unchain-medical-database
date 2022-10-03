const main = async () => {
  const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
  const UnchainMedicalDatabaseFactory = await hre.ethers.getContractFactory("MedicalDatabase");
  const UnchainMedicalDatabaseContract = await UnchainMedicalDatabaseFactory.deploy();
  const UnchainMedicalDatabase = await UnchainMedicalDatabaseContract.deployed();

  console.log("Contract deployed to: ", UnchainMedicalDatabase.address);
  console.log("owner address: ", owner.address);
  console.log("owner Balance: ", UnchainMedicalDatabase.balance);

};

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};

runMain();
