// A document's core identity never changes after creation — use const
const documentId = "doc_001";

// A document's processed status WILL change — use let
//let isProcessed = false;

// Never use var — it has weird scoping rules that cause bugs
// Just know it exists in old code you might read

// String — text data
const fileName = "Organic Chemistry Week 3.pdf";

// Number — sizes, counts, indexes
const fileSizeInBytes = 204800;

// Boolean — states and flags  
let isProcessed = false;

// null — intentionally empty (embedding not generated yet)
const embedding = null;

// undefined — field doesn't exist yet
let processedAt; // undefined until processing happens

// Check types using typeof
/** console.log(typeof fileName);      // "string"
console.log(typeof fileSizeInBytes); // "number"
console.log(typeof isProcessed);   // "boolean"
console.log(typeof embedding);     // "object" (typeof null is a famous JS bug)
console.log(typeof processedAt);   // "undefined" **/


// Three ways to write strings — know all three
const single = 'Organic Chemistry';
const double = "Week 3 Notes";
const template = `${single} - ${double}`; // template literals — USE THESE

//  will use template literals constantly for building messages,
// API responses, log statements, error messages

const doc = { name: "notes.pdf", courseId: "chem101" };

// Ugly way
//console.log("Document " + doc.name + " in course " + doc.courseId);

// Clean way — get used to this
//console.log(`Document ${doc.name} in course ${doc.courseId}`);


////const document = {
    //email: "aryan@gmail.com",
    //name: "notes.pdf",
    //DOJ: "20-04-2026",
    //bytes: 204800,
    //status: "not processed",}


//

//const Course = {
    //name: "Mathematics",
    //documents: 0}
//

//console.log(`User ${document.email} joined on ${document.DOJ}`);
//console.log(`Document ${document.name} is ${document.bytes} bytes status: ${document.status}`);

// replicating the four main objects that my data will have

const document = {
    email: "aryan@gmail.com",
    name: "notes.pdf",
    DOJ: "20-04-2026",
    bytes: 204800,
    processingStatus: "not processed",
    isProcessed: false,
    processedAt:  new Date().toLocaleString(),
    

};
//console.log(document);

const user = {
    id: 124364,
    name: "AVEERAL JAIN",
    email: "abc@gmail.com",
    plan: "free",
    createdAt: "20-04-2026",
    isVerified: true
}

// similarly we can create objects for chunks and also course

// Dot notation — standard way
console.log(document.name);
console.log(document.isProcessed);

// Bracket notation — used when key is dynamic
const field = "name";
console.log(document[field]); // same as document.name

// Modifying fields
document.isProcessed = true;
document.processedAt = new Date().toISOString();
document.processingStatus = "done";
 



