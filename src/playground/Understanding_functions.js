// BLOCK 1: CREATING CONSTRUCTOR FUNCTIONS
const createDocument = (name,courseId,ownerId,sizeInBytes) => {
   
   const document = {id: "doc_" + Date.now(),
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
   
   const document = {id: "doc_" + Date.now(),
    id: "user_" + Date.now(),
    name,
    email,
    plan,
    isVerified: false,
    createdAt: new Date().toISOString
   };

   return document;

}

const createCourse = (name,subject,ownerId) => {
   
   const document = {id: "doc_" + Date.now(),
    id: "course_" + Date.now(),
    name,
    subject,
    ownerId,
    documentCount: 0,
    createdAt: new Date().toISOString
   };

   return document;

}

const createChunk = (text,chunkIndex,documentId) => {
   
   const document = {id: "doc_" + Date.now(),
    id: "chunk_" + Date.now() + " " + chunkIndex,
    text,
    chunkIndex,
    documentId,
    wordCount: text.split().length,
    isEmbedded: false,
    embeddedAt: null
   };

   return document;

}





