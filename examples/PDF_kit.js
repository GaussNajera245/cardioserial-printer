const PDFDocument = require('pdfkit');
const fs = require('fs');
const printer = require("../lib");
const printFile = require("./printFile");

const Nombre = "NESTOR MIGUEL LOPEZ ";
const employeeID = "4801300319" ;
const idToma = "5f3160bc53405f000485d2da";
const syst = 192;
const pulse = 180;
const rfid = "404079";
const dias = 189;

//fecha y hora

    const doc = new PDFDocument({
        size: [210,140],
        margins : { // by default, all are 72
            top: 10,
        bottom:10,
            left: 20,
        right: 10
        }
    })

function savePdfToFile(pdfConfig){
    return new Promise((resolve, reject) => {
        let pendingStepCount = 2;

        const stepFinished = () => {
            if (--pendingStepCount == 0) {
                resolve();
            }
        };

        const writeStream = fs.createWriteStream('output.pdf');
        writeStream.on('close', stepFinished);
        writeStream.on("error", e => {
            reject(e);
        });
        
        pdfConfig.pipe(writeStream);
        
        pdfConfig.image('../assets/logo_straight.png',18,0, {width:135});

        pdfConfig
          .fontSize(10)
          .text(`Empleado: ${Nombre}`, 0, 30);
          
        pdfConfig
          .fontSize(10)
          .text(`  `);
          
        pdfConfig
          .fontSize(10)
          .text(`RFID: ${rfid}   No.Empleado: ${employeeID}`);  

        pdfConfig
          .fontSize(10)
          .text(`ID de toma:   ${idToma}`);
        
        pdfConfig
          .fontSize(10)
          .font('Helvetica')
          .text(`Fecha:    ${Date().slice(0,24)}`);
          
        pdfConfig
          .fontSize(12)
          .font('Times-Bold')
          .text(`Sistolica: ${syst}        Diastolica: ${syst}        Pulso: ${syst}`);

        pdfConfig.end();
        stepFinished();
    }); 
}


savePdfToFile(doc)
    .then(()=>{
         printFile()
         console.log("done");
    })
    .catch( e => {
        console.log({e})
    }); 

