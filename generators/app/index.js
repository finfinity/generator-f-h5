const path = require("path");
const chalk = require("chalk");
const util = require("util");
const Generator = require("yeoman-generator");
const yosay = require("yosay");
const mkdirp = require("mkdirp");
const foldername = path.basename(process.cwd());

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }
  prompting() {
    this.log(yosay("~" + chalk.red("generator-tutorabc-h5") + "~"));
    return this.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What's the name of your application",
        default: foldername
      },
      {
        type: "input",
        name: "projectDesc",
        message: "What's the description of your application:"
      },
      {
        type: "list",
        name: "projectTemplate",
        message: "Please choose template:",
        choices: ["default"]
      },
      {
        type: "list",
        name: "projectLicense",
        message: "Please choose license:",
        choices: ["MIT", "ISC", "Apache-2.0", "AGPL-3.0"]
      }
    ]).then(answers => {
      this.projectName = answers.projectName ? answers.projectName : " ";
      this.projectDesc = answers.projectDesc ? answers.projectDesc : " ";
      this.projectLicense = answers.projectLicense || "MIT";
      this.projectTemplate = answers.projectTemplate || "default";
    });
  }
  configuring() {
    this.config.set("projectName", this.projectName);
    this.config.set("projectDesc", this.projectDesc);
    this.config.set("projectLicense", this.projectLicense);
    this.config.set("projectTemplate", this.projectTemplate);
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      this
    );
    this.fs.copyTpl(
      this.templatePath("postcss.config.js"),
      this.destinationPath("postcss.config.js"),
      this
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this
    );
    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc"),
      this
    );
    this.fs.copyTpl(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore"),
      this
    );
    this.fs.copyTpl(
      this.templatePath("build"),
      this.destinationPath("build"),
      this
    );
    this.fs.copyTpl(
      this.templatePath("src/" + this.projectTemplate),
      this.destinationPath("src"),
      this
    );
  }
  /* install() { //安装依赖
    this.installDependencies({
      bower: false
    });
  } */
};
