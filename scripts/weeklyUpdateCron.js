const cron = require('node-cron');
const weeklyUpdateController = require('./src/controllers/weeklyUpdateController');

// Schedule task to run every Sunday at midnight
cron.schedule('0 0 * * 0', () => {
  console.log('Sending weekly update...');
  weeklyUpdateController.sendWeeklyUpdate();
});
