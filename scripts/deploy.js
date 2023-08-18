const { ethers } = require("ethers");
const fs = require("fs");

async function deployContract(provider, artifact) {
  const signer = new ethers.Wallet("b322b0c467fd643a5e20a946988181b3c658c63fd135c77ed4e44280ae4fcc8c", provider); // Replace with your private key
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
  const contract = await factory.deploy();
  await contract.deployed();
  return contract;
}

async function main() {
  try {
    // Connect to the local Ethereum network using a JSON-RPC URL
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    // Load compiled contract artifacts
    const QuasteTokenArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/QuasteToken.sol/QuasteToken.json"));
    const RecyclingFacilityArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/RecyclingFacility.sol/RecyclingFacility.json"));
    const UserManagementArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/UserManagement.sol/UserManagement.json"));
    const WasteCollectionContractArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/WasteCollectionContract.sol/WasteCollectionContract.json"));
    const WasteCollectionPaymentArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/WasteCollectionPayment.sol/WasteCollectionPayment.json"));
    const WasteCollectorAssignmentArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/WasteCollectorAssignment.sol/WasteCollectorAssignment.json"));
    const WasteCollectorRatingArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/WasteCollectorRating.sol/WasteCollectorRating.json"));
    const WasteManagementArtifact = JSON.parse(fs.readFileSync("artifacts/contracts/WasteManagement.sol/WasteManagement.json"));

    // Deploy contracts
    const quasteToken = await deployContract(provider, QuasteTokenArtifact);
    const recyclingFacility = await deployContract(provider, RecyclingFacilityArtifact);
    const userManagement = await deployContract(provider, UserManagementArtifact);
    const wasteCollectionContract = await deployContract(provider, WasteCollectionContractArtifact);
    const wasteCollectionPayment = await deployContract(provider, WasteCollectionPaymentArtifact);
    const wasteCollectorAssignment = await deployContract(provider, WasteCollectorAssignmentArtifact);
    const wasteCollectorRating = await deployContract(provider, WasteCollectorRatingArtifact);
    const wasteManagement = await deployContract(provider, WasteManagementArtifact);

    // Log deployed addresses
    console.log("QuasteToken deployed to:", quasteToken.address);
    console.log("RecyclingFacility deployed to:", recyclingFacility.address);
    console.log("UserManagement deployed to:", userManagement.address);
    console.log("WasteCollectionContract deployed to:", wasteCollectionContract.address);
    console.log("WasteCollectionPayment deployed to:", wasteCollectionPayment.address);
    console.log("WasteCollectorAssignment deployed to:", wasteCollectorAssignment.address);
    console.log("WasteCollectorRating deployed to:", wasteCollectorRating.address);
    console.log("WasteManagement deployed to:", wasteManagement.address);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
