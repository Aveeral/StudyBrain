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
   if(type != "string"){
      return {
         valid: false,
         reason: "Incorrect Datatype: Not a string"
      }
   }
   const length = docName.length;
   if(length>200 || length<3){
         return{
            valid: false,
            reason: "Name of file is either too short(<3) or too long(>200)"
         }
   }
   const ending = (docName.endsWith(".pdf") || docName.endsWith(".txt"));
   if (!ending) {
         
      return {
         valid: false,
         reason: "File must be in form of .pdf or .txt"
      }
   }
   
   return {
      valid: true
   }

}



const validateEmail = (email) => {
       
   const type = typeof email;
   if(type != "string"){
      return {
         valid: false,
         reason: "Incorrect Datatype: Not a string"
      }
   }
   const length = email.length
   if(length<5){
      return{
            valid: false,
            reason: "length less than 5 characters"
         }
   }
   if(!email.includes("@")){
         return{
            valid: false,
            reason: "Does not include @"
         }
   }
   
   if (!email.includes(".")) {
         
      return {
         valid: false,
         reason: "File does not contain ."
      }
   }
   
   return {
      valid: true
   }

}

const validatePlan = (plan) => {
   if(plan === "free" || plan === "pro"){
      return {
         valid: true
      }
   }
   else{
      return {
         valid: false,
         reason: "Invalid plan"
      }
   }
}


const validateChunk = (chunk) => {

   if(typeof chunk != "string"){
      return {
         valid: false,
         reason: "Incorrect Datatype: Not a string"
      }
   }

    if(!chunk.trim()){
      return{
         valid: false,
         reason: "chunk is empty after trimming"
      }
   }

   if(chunk.trim().split(" ").length<10){
      return{
         valid: false,
         reason: "length less than 10 characters "
      }
   }
  

   return{
      valid: true
   }
}

// BLOCK 3: TEXT INGESTION PIPELINE

const sanitizeText = (rawText) => {
   return rawText.trim().replace(/\s+/g," ");
}

const chunkText = (rawText,chunkSize=500)  => {
   rawText = sanitizeText(rawText);
   const words = rawText.split(" ");
   
   
   const chunks = [];
   
   for(let i=0;i<words.length;i= i+chunkSize){
      
      chunks.push(words.slice(i,i+chunkSize).join(" "));
      
   }
   return chunks
}

const ingestText = (rawText,documentId) => {
     const chunks = chunkText(rawText,100);
     const chunkObjects = [];
     
     for(let i=0;i<chunks.length;i++){
      chunkObjects.push(createChunk(chunks[i],i,documentId));
      console.log(`Chunk ${i + 1} of ${chunks.length} — ${chunkObjects[i]["wordCount"]} words`);
     }
     return chunkObjects
}


//console.log(ingestText("Your system converts that question into an embedding — a list of 1500 numbers representing what that question meammjngjkhfkhgkgkgrjgrbbsvbsvbsvbmsbs jdks skd vjvkdnfbg“A nation is not just a piece of land on a map — it is the feeling in our hearts that says, ‘This is my home.Good morning respected teachers and my dear friends,My name is Aveeral, and today I am here to speak about Nationalism.Nationalism is the love, loyalty, and devotion we feel towards our nation. It is the pride we experience when our flag is hoisted high, when our soldiers protect our borders, and when our athletes represent us on the world stage. But nationalism is not just about celebrating achievements — it is also about responsibility.True nationalism means respecting our country’s values, culture, and diversity. It means following rules, helping fellow citizens, protecting public property, and working honestly for the progress of our nation. It is not about thinking our country is perfect; it is about believing in its potential and contributing to make it better.In a country as diverse as India, with different languages, religions, and traditions, nationalism is the force that unites us as one. It reminds us that despite our differences, we share one identity — we are Indians.Let us practice nationalism not just in words, but through our actions every",19486768))

// BLOCK 4: ACCESS CONTROL

const canUpload = (user,currentDocCount) => {
   if(user.plan === "free"){
      if(currentDocCount>=5){
         return {
            allowed: false,
            reason: "Upload limit reached for free plan"
         }
      }
        else{
         return {
            allowed: true
         }
      }
      }

   else{
      if(currentDocCount>=50){
         return {
            allowed: false,
            reason: "Upload limit reached for pro plan"
         }
      }
      else{
         return{allowed: true}
      }
   }
         
   }

const canAccessDocument = (user,doc) => {
   if(user.id === doc.ownerId){
      return{allowed: true}
   }
   else{
      return{
         allowed: false,
         reason: "You do not own this document"
      }
   }
}

const canDeleteDocument = (user,doc)  => {
   const owns =  canAccessDocument(user,doc)
   if(!owns.allowed){
      return {
         allowed: false,
         reason: "You do not own this document"
      }
   }
   if(doc.processingStatus === "processing"){
      return{
         allowed:false,
         reason: "The document is still being processed"
      }
   }
   return{
      allowed: true
   }
}

// BLOCK 5: 
















