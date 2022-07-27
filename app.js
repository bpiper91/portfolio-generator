// call file system module
const fs = require('fs');

// take input data from the page template file
const generatePage = require('./src/page-template.js');

// capture the user input
const profileDataArgs = process.argv.slice(2, process.argv.length); // items 0 & 1 are location and file being executed
// get the name and GitHub username from the input text
const [name, github] = profileDataArgs

fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new err;

  console.log('Portfolio complete! Check out index.html to see the output!');
});