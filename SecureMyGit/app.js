const express = require('express');
const bodyParser = require('body-parser');
const repoController = require('./controllers/repoController');
const adminController = require('./controllers/adminController'); // Add this line

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', repoController.getHomePage);
app.post('/upload', repoController.uploadRepoAddress);

app.get('/admin', adminController.getAdminPage);
app.post('/admin/add-package', adminController.addMaliciousPackage);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});