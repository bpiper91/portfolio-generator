// load inquirer module (npm package)
const inquirer = require('inquirer');

// // call file system module (core library module)
// const fs = require('fs');

// // take input data from the page template file
// const generatePage = require('./src/page-template.js');

// // get the name and GitHub username from the input text
// const pageHTML = generatePage(name, github);

// // create HTML file from pageHTML output
// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw new err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));

  