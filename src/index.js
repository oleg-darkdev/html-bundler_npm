const fs = require('fs'),
      cl = require('node-cl-log');
/*
  @description Is responsible for assembly of several *.html files in one bandle in a certain order which is described in the file.
  @param Takes all files from the transferred directory.
  @param The file (assembly) collects in transferred.
  @param Order of turn in which files from the first argument will gather in the file from the second argument.
*/
class BundleHtml {
  constructor(arrayConfig) {
    this.pathSrcHtml = arrayConfig[0];
    this.pathBuildHtml = arrayConfig[1];
    this.filesListOrder = arrayConfig[2];
  }
  genBundle() {
    const bundleHtmlArr = [],
          pathSrcHtml = this.pathSrcHtml,
          pathBuildHtml = this.pathBuildHtml,
          filesListOrder = this.filesListOrder;
    fs.readdir('./data/', function (err, items) {
      // create new array with elements in the necessary order
      filesListOrder.forEach(el => {
        bundleHtmlArr.push(items[items.indexOf(el)]);
      });
      // cl.log(bundleHtmlArr )
      // cl.log(items )
      bundleHtmlArr.forEach(el => {
        fs.readFile(pathSrcHtml + el, function (err, data) {
          if (err) {
            cl.log(err);
          } else {
            // cl.log(data); // file content
            fs.open(pathBuildHtml, "w+", function (err, fileHandle) {
              if (!err) {
                fs.appendFile(pathBuildHtml, data, function (err) {
                  cl.gre(`Assembly of a bandl has taken place successfully, you can take away the collected file ${pathBuildHtml}`);
                  if (err) throw err;
                });
              } else {
                cl.red(`There was an error creating ${pathBuildHtml}`);
              }
            }); // end open
          }; // end else
        }); // end readfile
      }); // bundleHtmlArr
    }); // end readdir
  };
};

module.exports = BundleHtml;
