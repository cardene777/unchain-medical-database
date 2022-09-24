const main = async () => {
  const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
  const UnchainMedicalDatabaseFactory = await hre.ethers.getContractFactory("MedicalDatabase");
  const UnchainMedicalDatabaseContract = await UnchainMedicalDatabaseFactory.deploy();
  const UnchainMedicalDatabase = await UnchainMedicalDatabaseContract.deployed();

  console.log("Contract deployed to: ", UnchainMedicalDatabase.address);
  console.log("owner address: ", owner.address);
  console.log("randomPerson address: ", randomPerson.address);

  await UnchainMedicalDatabase.addMedicalData("cardene", "A")

  let medicalData
  medicalData = await UnchainMedicalDatabase.getPatientData(owner.address)
  console.log("Get Medical Data");
  console.log("*".repeat(50));
  console.log("medicalData: ", medicalData);
  console.log("*".repeat(50));

  await UnchainMedicalDatabase.editMedicalData(owner.address, "cardene update", "AB")

  medicalData = await UnchainMedicalDatabase.getPatientData(owner.address)
  console.log("Get Medical Data");
  console.log("*".repeat(50));
  console.log("medicalData: ", medicalData);
  console.log("*".repeat(50));

  await UnchainMedicalDatabase.addDoctor(owner.address, randomPerson.address)

  medicalData = await UnchainMedicalDatabase.getPatientData(owner.address)
  console.log("Get Medical Data");
  console.log("*".repeat(50));
  console.log("medicalData: ", medicalData);
  console.log("*".repeat(50));

  await UnchainMedicalDatabase.addDoctor(owner.address, randomPerson2.address)

  medicalData = await UnchainMedicalDatabase.getPatientData(owner.address)
  console.log("Get Medical Data");
  console.log("*".repeat(50));
  console.log("medicalData: ", medicalData);
  console.log("*".repeat(50));

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
