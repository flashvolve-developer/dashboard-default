// import AdmZip from "adm-zip";
// import multer, { diskStorage } from 'multer';
// import * as fs from 'fs';
// const path = require('path');
// const zip = new AdmZip();

// const dir = '../assets';
// const subDirectory = '../assets/uploads';

// if (!existsSync(dir)) {
//     fs.mkdirSync(dir)

//     fs.mkdirSync(subDirectory);
// }

// const storage = diskStorage({
//     destination: function (cb) {
//         cb(null, '../assets/uploads')
//     },
//     filename: function (file, cb) {
//         cb(null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// });

// const maxSize = 10 * 1024 * 1024;

// const compressfilesupload = multer({ storage: storage, limits: { fileSize: maxSize } });

// function main(cards) {
//     compressfilesupload.array('file', 100);

//     if (cards) {
//         cards.forEach(file => {
//             console.log(file.path);
//             zip.addLocalFile(file.path);
//         });

//         const outputPath = Date.now() + 'output.zip';

//         fs.writeFileSync(outputPath, zip.toBuffer());
//     }
// }

// export default main();



// const JSZip = require('jszip');

// const zip = new JSZip();

// zip.file("Hello.txt", "Hello World\n");

// const img = zip.folder("images");
// img.file("smile.gif", imgData, {base64: true});

// zip.generateAsync({type:"blob"}).then(function(content) {
//     // see FileSaver.js
//     saveAs(content, "example.zip");
// });
