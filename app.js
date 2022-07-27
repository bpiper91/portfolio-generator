// load inquirer module (npm package)
const inquirer = require('inquirer');

// call file system module (core library module)
const fs = require('fs');

// take input data from the page template file
const generatePage = require('./src/page-template.js');

// for testing purposes, DELETE LATER
const mockData = {
  name: 'Lernantino',
  github: 'lernantino',
  projects: [{
    name: 'Run Buddy',
    description: 'Running website',
    languages: [
      'HTML', 
      'CSS'
    ],
    link: 'https://github.com/lernantino/run-buddy',
    feature: true
  },
  {
    name: 'Taskinator',
    description: 'Task management site',
    languages: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    link: 'https://github.com/lernantino/taskinator',
    feature: false
  },
  {
    name: 'Taskmaster Pro',
    description: 'Task management site',
    languages: [
      'HTML',
      'CSS',
      'JavaScript',
      'JQuery',
      'Bootstrap'
    ],
    link: 'https://github.com/lernantino/taskmaster-pro',
    feature: true
  }]
};

// user profile questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username.');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

// user project questions
const promptProject = portfolioData => {
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  };

  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a project name.');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project. (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a project description.');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a GitHub link.');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// prompt user for account and project info
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    // get the name and GitHub username from the input text
    const pageHTML = generatePage(mockData);   // should run function with portfolioData

    // create HTML file from pageHTML output
    fs.writeFile('./dist/index.html', pageHTML, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Page created! Check out index.html in this directory to see it!');
    
      fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Style sheet copied successfully!');
      });
    });
  });