const extractTextPDF = require("pdf-parse");
async function extractText(file){
    if(file.mimetype == 'application/pdf'){
        const content = await extractTextPDF(file.buffer);
        return content.text;
    }
    if(file.mimetype == 'text/plain'){
        const content = file.buffer;
        return content.toString();
    }   
}

module.exports = extractText;