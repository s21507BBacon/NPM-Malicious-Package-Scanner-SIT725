//Created by Bryce Bacon on 21/09/2024
const User = require("../models/user");
const Repository = require("../models/repository");
const MaliciousPackage = require("../models/maliciousPackage");
const WeeklyUpdate = require("../models/weeklyUpdate");

const initialiseDatabase = async () => {
  try {
    // This will ensure that the models are registered with Mongoose
    // If the collections don't exist, they will be created when the first document is inserted
    console.log("Initialising User model");
    await User.init();

    console.log("Initialising Repository model");
    await Repository.init();

    console.log("Initialising MaliciousPackage model");
    await MaliciousPackage.init();

    console.log("Initialising WeeklyUpdate model");
    await WeeklyUpdate.init();

    console.log("Database initialisation completed.");
  } catch (error) {
    console.error("Error initialising database:", error);
    throw error; // Propagate the error so the app can handle it
  }
};

module.exports = initialiseDatabase;
