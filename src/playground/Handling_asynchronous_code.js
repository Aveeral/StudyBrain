const stimulateDelay = (ms) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`DONE AFTER ${ms} ms`)
        },ms)
    })
}

const doc = { name: "notes.pdf", courseId: "bio101", isProcessed: false };


const simulateDatabaseFetch = (id) => {
    return new Promise((resolve,reject) => {
        if(!id.startsWith("doc_")){
            reject("Invalid Document ID")
            return
        }
        resolve({...doc,id})
    })
}


const simulateEmbedding = (text) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const numbers = [];
            for(let i=0;i<5;i++){
                numbers.push(Math.random()*10)
                
            }
            resolve(numbers)
        },500)
    })
}

/*
// chaining together 
simulateDatabaseFetch("doc_001")
  .then((newDoc) => {
    console.log(newDoc.name);
    // newDoc only exists inside THIS function
    return simulateEmbedding(newDoc.name);  // return it here
  })
  .then((embeddings) => {
    // newDoc is gone here — but embeddings arrived from the return above
    console.log(embeddings);
  })
  .catch((error) => {
    console.log(error);
  });
  */

// using async await 

async function chaining() {
try{
       const newDoc = await simulateDatabaseFetch("doc_001");
       console.log(newDoc.name);
       const embeddings = await simulateEmbedding(newDoc)
       console.log(embeddings)

} catch{
     console.log("ERROR HAS OCCURED")
}
}


async function processDocument(docId) {
     const error = !docId.startsWith("doc_");
    try{
        
      const newDoc = await simulateDatabaseFetch(docId)
      const {name} = newDoc
      console.log(`Fetched: ${name} `)
      const embeddings = await simulateEmbedding(name)
      console.log(`Embedded: ${embeddings}`)
      return {newDoc,embeddings}
        
    } catch(error){
        console.log("An Error has occured")
    }
}


async function getMultipleDocuments(ids){
   const [doc_embeddings,newDoc] = await Promise.all([
       processDocument(ids[0]),
       simulateDatabaseFetch(ids[1])
   ]
    )
    console.log(doc_embeddings)
    console.log(newDoc)
}


// fetch and real api call
/*
async function getPublicData() {
  try{
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/error");
 
   if(!response.ok){
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
} catch(error) {
    console.log(error.message);
}
}
*/

async function getPublicData() {
    try{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if(!response.ok){
        throw new Error(`HTTP ERROR: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    }catch(error){
        console.log(error)
    }
}


async function fetchMultiplePromise() {
   const ids = [1,2,3,4,5];
   const  responses = await  Promise.all(ids.map((id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)));
   const data = await Promise.all(responses.map((res) => res.json()))
   console.log(data)
}

// use jsonplaceholder as a stand-in — just to practice the fetch pattern
// pretend the response IS an embedding
async function simulateOpenAIEmbedding(text) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  // return a fake embedding using the post id as seed
  return Array.from({ length: 5 }, (_, i) => data.id * (i + 1) * 0.1);
}

// Simulating Full Ingestion Pipeline

const chunkText = (rawText,chunkSize=500)  => {
   rawText = sanitizeText(rawText);
   const words = rawText.split(" ");
   
   
   const chunks = [];
   
   for(let i=0;i<words.length;i= i+chunkSize){
      
      chunks.push(words.slice(i,i+chunkSize).join(" "));
      
   }
   return chunks
}

 async function ingestDocument(rawText,documentId){
        
 }











