// src/utils/validator.js
const Joi = require('joi');

// Validate GitHub repository URL submission
const validateRepoSubmission = (data) => {
  const schema = Joi.object({
    repoAddress: Joi.string().uri().required().label('Repository URL'),
  });

  return schema.validate(data);
};

// Validate malicious package input (for admin controller)
const validateMaliciousPackage = (data) => {
  const schema = Joi.object({
    packageName: Joi.string().min(1).required().label('Package Name'),
    version: Joi.string().min(1).optional().label('Package Version'),
    description: Joi.string().optional().label('Package Description'),
    reportedBy: Joi.string().required().label('Reported By'),
  });

  return schema.validate(data);
};

module.exports = {
  validateRepoSubmission,
  validateMaliciousPackage,
};
//add to repocontroller
//const { validateRepoSubmission } = require('../utils/validator');
//onst logger = require('../utils/logger');

///exports.uploadRepoAddress = async (req, res) => {
  // Validate the request data
  //const { error } = validateRepoSubmission(req.body);
  //if (error) {
    //logger.warn(`Invalid repository submission: ${error.details[0].message}`);
    //return res.status(400).json({ error: error.details[0].message });
 // }

  // Proceed with the repository scanning logic
//  const { repoAddress } = req.body;
 /// logger.info(`Repository submitted: ${repoAddress}`);

  // Continue with the rest of the logic
//};