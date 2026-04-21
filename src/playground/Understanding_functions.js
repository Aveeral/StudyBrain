// BLOCK 1: CREATING CONSTRUCTOR FUNCTIONS
const createDocument = (name,courseId,ownerId,sizeInBytes) => {
   
   const document = {
    id: "doc_" + Date.now(),
    name,
    courseId,
    ownerId,
    sizeInBytes,
    mimeType: null,
    processingStatus: "pending",
    isProcessed: false,
    uploadedAt: new Date().toISOString(),
    processedAt: null,
    pageCount: null
   };

   return document;

}

const createUser = (name,email,plan = "free") => {
   
   const user= {
    id: "user_" + Date.now(),
    name,
    email,
    plan,
    isVerified: false,
    createdAt: new Date().toISOString()
   };

   return user;

}

const createCourse = (name,subject,ownerId) => {
   
   const course = {
    id: "course_" + Date.now(),
    name,
    subject,
    ownerId,
    documentCount: 0,
    createdAt: new Date().toISOString()
   };

   return course;

}

const createChunk = (text,chunkIndex,documentId) => {
   
   const chunk = {
    id: "chunk_" + Date.now() + "_" + chunkIndex,
    text,
    chunkIndex,
    documentId,
    wordCount: text.split(" ").length,
    isEmbedded: false,
    embeddedAt: null
   };

   return chunk;

}


// BLOCK 2: CREATING VALIDATION FUNCTIONS

const validateDocumentName = (docName) => {
       
   const type = typeof docName;
   const length = docName.length;
   const ending = (docName.endsWith(".pdf") || docName.endsWith(".txt"));
   if (length<=200 && length>=3 && type === "string" &&  ending) {
         
      return {valid: true}
   }
   else{
      return {
         valid: false,
         reason: "issue with length(btw 3 and 200) ending(.pdf or .txt) or datatype of docname"      
      }
   }
   return 

}









