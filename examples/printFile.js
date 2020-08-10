// use: node printFile.js [New EPSON_TM-T20II]
var printer = require("../lib");
//var filename = process.argv[2] || __filename;
//var filename = "print_raw.js";

function printFile(){
  console.log('platform:', process.platform);
  console.log('try to print file: ' + 'output.pdf');

  if( process.platform != 'win32') {
    printer.printFile({filename:'output.pdf',
      printer: 'EPSON_TM-T20II', // printer name, if missing then will print to default printer
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
      },
      error:function(err){
        console.log(err);
      }
    });
  } else {
    // not yet implemented, use printDirect and text
    var fs = require('fs');
    printer.printDirect({data:fs.readFileSync('output.pdf'),
      printer: 'EPSON_TM-T20II', // printer name, if missing then will print to default printer
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
      },
      error:function(err){
        console.log(err);
      }
    });
  }
}

module.exports = printFile;
