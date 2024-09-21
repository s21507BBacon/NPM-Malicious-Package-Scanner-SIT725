Created by:
DEVANSHU BHADOURIA - <Enter Email Here>
Bryce Bacon - brycedbacon@gmail.com
ZIJIA ZHANG - <Enter Email Here>
AMRIT PAL SINGH <Enter Email Here>

Setting up package.

Part 1 setting up Node.js

1. Git clone repository
2. Make sure you have node.js installed on your computer
3. Once you done this, use following command in terminal root dir of repository
   "npm install express" - This will install modules for running the application

Part 2 - Set up Database

1. Create Mongodb atlas cluster
2. Go to connection on mongodb, copy node.js connection string and save it.
3. 31. Install MongoDB in command line
       "npm install mongodb"
   32. install dotenv by this command
       "npm install express mongoose dotenv"
4. Add connection string to dotenv file like so
   MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority"
   Replacing <> with own database cluster
5. Run npm dev to run test to connect to database
6. run the createCollections command to create collections
   "node createCollections.js"

Part 3 - Build and Run Docker

1. Make sure you have docker and dockerhub installed on your computer
