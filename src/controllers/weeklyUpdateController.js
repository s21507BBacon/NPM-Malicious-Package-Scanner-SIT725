const weeklyUpdateController = require('../controllers/weeklyUpdateController');
const WeeklyUpdate = require('../models/weeklyUpdate');
const Repository = require('../models/repository'); 
const emailService = require('../services/emailService'); 
const moment = require('moment');

exports.sendWeeklyUpdate = async (req, res) => {
  try {
    const oneWeekAgo = moment().subtract(7, 'days').toDate();
    const recentRepositories = await Repository.find({
      lastScanned: { $gte: oneWeekAgo },
    });

    if (!recentRepositories.length) {
      return res.status(200).json({ message: 'No repositories scanned in the past week.' });
    }

    const updateContent = recentRepositories.map(repo => {
      return `Repository: ${repo.repositoryName}, Last Scanned: ${moment(repo.lastScanned).format('MMMM Do YYYY, h:mm:ss a')}`;
    }).join('\n');

    const recipients = ['recipient1@example.com', 'recipient2@example.com'];

    const subject = "Weekly Update: Repositories Scanned";
    const body = `Hello,\n\nHere are the repositories scanned this week:\n\n${updateContent}\n\nBest regards,\nYour Team`;

    await emailService.sendEmail({
      to: recipients,
      subject,
      text: body,
    });

    const weeklyUpdate = new WeeklyUpdate({
      sentDate: new Date(),
      contentSummary: 'Repositories scanned this week',
      recipients,
    });

    await weeklyUpdate.save();

    res.status(200).json({ message: 'Weekly update sent successfully!' });
  } catch (error) {
    console.error('Error sending weekly update:', error);
    res.status(500).json({ error: 'Failed to send weekly update' });
  }
};