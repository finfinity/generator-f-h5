const fs = require("fs-extra");
const path = require("path");

var name = "<%= projectName %>";

try {
  fs.ensureDirSync(path.resolve(__dirname, "../../../dist"));
  fs.removeSync(path.resolve(__dirname, "../../../dist/" + name));
  // fs.copySync(
  //   path.resolve(__dirname, "../src"),
  //   path.resolve(__dirname, "../../../dist/" + name),
  //   { overwrite: true }
  // );
  fs.moveSync(
    path.resolve(__dirname, "../dist"),
    path.resolve(__dirname, "../../../dist/" + name),
    {
      overwrite: true
    }
  );
  console.log("success!");
} catch (err) {
  console.error(err);
}