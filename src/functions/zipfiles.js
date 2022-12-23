const JSZip = require('jszip');
import { saveAs } from 'file-saver';

const getBase64 = async (url) => {
    const blobImage = await fetch(url).then((response) => response.blob());

    return new Promise(async (resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blobImage);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
}

export default async function zipfiles(customizations, path) {
    const zip = new JSZip();

    for (let i = 0; i < customizations.length; i++) {
        const imgData = await getBase64(customizations[i].cloudinary);
        const img = zip.folder("images");

        img.file(`${customizations[i].id}-${path}.png`, imgData.split(',')[1], { base64: true });
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `${Date.now()}-${path}.zip`);
    });
}

