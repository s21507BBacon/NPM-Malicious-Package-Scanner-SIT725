// routes/gitRoutes.js
const express = require('express');
const { getPackageJsonUpdates } = require('../controllers/gitController');
const{addMaliciousPackage}=require('../controllers/adminController');
const getmaliciousController = require('../controllers/maliciousController');
const router = express.Router();
// router.get('/view', (req, res) => {
//     res.render('view'); // Render the view.ejs file
// });

// Define the route to fetch package.json updates
router.post('/fetch-package-json-updates', getPackageJsonUpdates);
//Define route to add malicious package
router.post('/add',addMaliciousPackage);
//Define route to get all malicious package list from db
router.get('/malicious-packages', getmaliciousController.getAllMaliciousPackages); 
//router.get('/',getmaliciousController.getViewPage);
router.get('/malicious-packages-name', getmaliciousController.searchMaliciousPackageByName); 
router.post('/malicious-package-names',getmaliciousController.searchMaliciousPackagesByNames);
router.delete('/delete-package/:packageName', getmaliciousController.deletePackageByName);
module.exports = router;
