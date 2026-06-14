const { PdfReader } = require("pdfreader");

async function extractText(file) {
    if (file.mimetype === 'application/pdf') {
        return new Promise((resolve, reject) => {
            let text = '';
            new PdfReader().parseBuffer(file.buffer, (err, item) => {
                if (err) return reject(err);
                if (!item) return resolve(text);
                if (item.text) text += item.text + ' ';
            });
        });
    }
    if (file.mimetype === 'text/plain') {
        return file.buffer.toString();
    }
}

module.exports = extractText;