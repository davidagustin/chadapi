# Chad Serverless API
Chad is a location based chatroom service that allows users to start and join trending chatrooms in their area. Stay home and chat or travel the world and join chatrooms around the globe. Chad aims to provide quality communication services without sacrificing user privacy and trust.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


##### Overview
[Getting Started](#getting-started) 
[Usage](#usage)   
[Development](#development)  
[References](#references)  
[Testing](#testing)  
[Deployment](#deployment)  
[Built With](#built-with)


### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites
1. [Install Node](https://nodejs.org/en/download/)
2. [Install Git](https://git-scm.com/downloads)

#### Installing
Follow the steps below to get your development enviroment set up.

1.  Pull the repo. Open the terminal and and run the following:

    ```
    git clone https://github.com/boomitarts/chadapi.git
    ```

2.  After cloning the repo, open the project. Run the following command:

    ```
    npm install
    ```

      in the terminal. This will install the necessary dependencies for the
      project. A list of those dependencies can be found in `package.json`.
      
3. Run `npm run setup` in your terminal. This will install the latest version of
   Firebase Tools globally, configure the Firebase Hosting targets, and install
   the rest of your project dependencies.
    

### Usage
###### Attention: This section is under construciton.


### Development
1. Retreive the configuration files from an administrator.
2. Run `npm run dev` to start the server. Nodemon will automatically restart the
   server as you make your changes.

##### Documentation
Following [JSDoc](http://usejsdoc.org/) standards, be sure to document any functions, classes, and other
code you write. It will be reviewed by a reviewer during your code review, and
your pull request will be denied if any code is improperly documeted.

For an overview of our JavaScript style guide, go to https://standardjs.com.


### References
###### Attention: This section is under construciton.

Helpful articles referenced during development.


### Testing
When you're ready to test your changes, run `npm test` in your project
directory. This will build the project and run your tests, as well as all the tests in the `src/__tests__` directory.  

A production build of the application can be served locally in two ways:
1. Run `npm run serve-staging` in the project directory. This will serve the
   `lib/public` folder with the Firebase Hosting settings for the staging site.
2. Run `npm run serve-production` in the project directory. This will build the
   project and serve `lib/public` folder with the Firebase Hosting settings for
   the production site.

**Note: Before creating a new branch and creating a pull request for your
changes, your build must pass all the tests. If you need help, please create a
test file and leave a comment in the test body, making note of any issues in
their respective files. Make sure to label your pull request "help wanted."**

If you're ready to have your changes reviewed, make sure your code is well
documented, and create a branch for your changes. Make sure to name the branch
appropriately, prefixing it with feature-, issue-, hotfix-, or release-. To
do this, run the following in your terminal:  
1. `git checkout -b <BRANCH_NAME>`
2. `git commit -am "<DESCRIPTIVE_COMMIT_MESSAGE>"`
3. `git push`
4. Create a pull request.

If you need to make additional changes, checkout your branch again, and then
commit and push your changes.


### Deployment
Update `firebase.json` to configure Firebase Hosting, and push the changes to a
release branch, if necessary. 
  - **Note:** The predeploy and rewrites properties are not mandatory for
   Firebase, but they are mandatory for this project. 

**Staging**  
Deploy using one of the following options:
- Run `npm run deploy-staging` in your terminal to deploy to Firebase.
- Run `firebase deploy -m "<YOUR_MESSAGE>" --only functions,hosting:staging` to deploy with an optional deploy message.

**Production**  
Deploy using one of the following options:
- Run `npm run deploy-production` in your terminal to deploy to Firebase. The
  predeploy hook will create a production build of the project.
- Run `firebase deploy -m "<YOUR_MESSAGE>" --only functions,hosting:production` to deploy with an optional deploy message.


### Built With
###### Attention: This section is under construciton.
