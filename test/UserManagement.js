const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const signers =  ethers.getSigners();

//const { expect } = require("chai");

describe("Combined Tests", function () {
  let WasteManagement;
  let WasteCollectorAssignment;
  let WasteCollectorRating;
  let WasteCollectionPayment;

  let signers; // Define the signers array


  before(async function () {
    // Initialize the signers array before each test
    signers = await ethers.getSigners();

        // Deploy the contracts using the first signer
    WasteManagement = await ethers.getContractFactory("WasteManagement");
    WasteCollectorAssignment = await ethers.getContractFactory("WasteCollectorAssignment");
    WasteCollectorRating = await ethers.getContractFactory("WasteCollectorRating");
    WasteCollectionPayment = await ethers.getContractFactory("WasteCollectionPayment");
  });

  it("should register a household and calculate distance correctly", async function () {
    const wasteManagement = await WasteManagement.deploy();
    await wasteManagement.deployed();

    await wasteManagement.registerHousehold(123, 456);

    const household = await wasteManagement.households(signers[0].address);
    expect(household.isRegistered).to.equal(true);

    // Test distance calculation function
    // ...
  })
  it("should optimize a waste collector's collection route", async function () {
    const wasteManagement = await WasteManagement.deploy();
    await wasteManagement.deployed();

    await wasteManagement.registerWasteCollector(789, 101);

    // Test route optimization function
    // ...
  });

  it("should schedule waste collection and notify the waste collector", async function () {
    const wasteManagement = await WasteManagement.deploy();
    await wasteManagement.deployed();

    await wasteManagement.registerHousehold(123, 456);
    await wasteManagement.scheduleCollection(1678939200); // UNIX timestamp for a future time

    // Test scheduling and notification functions
    // ...
  });

  it("should confirm collection by waste collectors and track the collection route", async function () {
    const wasteManagement = await WasteManagement.deploy();
    await wasteManagement.deployed();

    await wasteManagement.registerWasteCollector(789, 101);
    await wasteManagement.registerHousehold(123, 456);
    await wasteManagement.scheduleCollection(1678939200);

    // Confirm collection by the waste collector
    // ...

    // Test route tracking function
    // ...
  });

  it("should add collectors and collection requests", async function () {
    const wasteCollectorAssignment = await WasteCollectorAssignment.deploy();
    await wasteCollectorAssignment.deployed();

    await wasteCollectorAssignment.addCollector("Collector 1", 10);

    const collector = await wasteCollectorAssignment.collectors(signers[0].address);
    expect(collector.isRegistered).to.equal();

    // Test adding collection requests
    // ...
  });
  

});

describe("WasteManagement System", function () {
  let WasteManagement, WasteCollectorAssignment, WasteCollectorRating, WasteCollectionPayment;
  let wasteManagement, wasteCollectorAssignment, wasteCollectorRating, wasteCollectionPayment;
  let owner, household1, household2, collector1, facility1;

  beforeEach(async function () {
    [owner, household1, household2, collector1, facility1] = await ethers.getSigners();

    WasteManagement = await ethers.getContractFactory("WasteManagement");
    wasteManagement = await WasteManagement.connect(owner).deploy();

    WasteCollectorAssignment = await ethers.getContractFactory("WasteCollectorAssignment");
    wasteCollectorAssignment = await WasteCollectorAssignment.connect(owner).deploy();

    WasteCollectorRating = await ethers.getContractFactory("WasteCollectorRating");
    wasteCollectorRating = await WasteCollectorRating.connect(owner).deploy();

    WasteCollectionPayment = await ethers.getContractFactory("WasteCollectionPayment");
    wasteCollectionPayment = await WasteCollectionPayment.connect(owner).deploy(wasteManagement.address);

    await wasteManagement.deployed();
    await wasteCollectorAssignment.deployed();
    await wasteCollectorRating.deployed();
    await wasteCollectionPayment.deployed();

    await wasteManagement.connect(household1).registerHousehold(100, 200);
    await wasteManagement.connect(household2).registerHousehold(300, 400);
    await wasteManagement.connect(collector1).registerWasteCollector(500, 600);
    await wasteManagement.connect(facility1).registerRecyclingFacility(700, 800);
  });

  it("should register households, waste collectors, and recycling facilities", async function () {
    const householdLocation = await wasteManagement.households(household1.address);
    const collectorLocation = await wasteManagement.wasteCollectors(collector1.address);
    const facilityLocation = await wasteManagement.recyclingFacilities(facility1.address);

    expect(householdLocation.latitude).to.equal();
    expect(householdLocation.longitude).to.equal();
    expect(collectorLocation.latitude).to.equal();
    expect(collectorLocation.longitude).to.equal();
    expect(facilityLocation.latitude).to.equal();
    expect(facilityLocation.longitude).to.equal();
  });

  

  
})  