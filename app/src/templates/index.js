const glob = require("glob");

glob(`${__dirname}/**/!(index).@(html)`, (er, files) => {
  files.forEach((file) => {
    var fileobject = require.resolve(file);
    module.exports = {
      ...module.exports,
      [filename]: fileobject
    };
  });
});

// files.forEach((file) => {
//   var filename = file.split("/").pop();
//   var fileobject = require(file);
//   console.log(filename);
//   module.exports = { ...module.exports, [filename]: fileobject };
// });
// console.log(module.exports);
