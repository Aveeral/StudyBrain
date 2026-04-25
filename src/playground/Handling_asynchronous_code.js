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

getMultipleDocuments(["doc_757839","doc_6583"]);

