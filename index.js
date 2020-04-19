const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");
const questions = [
  {
    type: "input",
    name: "github",
    message: "What's your GitHub username?",
  },

  {
    type: "input",
    name: "title",
    message: "Project Name?",
  },

  {
    type: "input",
    name: "description",
    message: "Give a breif description of your project",
  },

  {
    type: "list",
    name: "license",
    message: "What kinf of license would you like your project to have?",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
  },

  {
    type: "input",
    name: "install",
    message: "what command should be ran to install dependencies?",
    default: "npm i",
  },

  {
    type: "input",
    name: "test",
    message: "what command is used for tests?",
    default: "npm test",
  },

  {
    type: "input",
    name: "usage",
    message: "What should the user need to know about this repo?",
  },

  {
    type: "input",
    name: "contributing",
    message: "what does the user to know aobut contributing to this repo?",
  },
];

function writeToFile(fileName, data) {
  return fs.writeFileSync(jpath.join(process.cwd(), fileName), data);
}

function init() {
  inquirer.prompt(questions).then((inquirerResponses) => {
    console.log("Searching...");

    api.getUser(inquirerResponses.github).then(({ data }) => {
      writeToFile(
        "README.md",
        generateMarkdown({ ...inquirerResponses, ...data })
      );
    });
  });
}

init();
