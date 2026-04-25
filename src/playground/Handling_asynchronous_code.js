const stimulateDelay = (ms) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`DONE AFTER ${ms} ms`)
        },ms)
    })
}
stimulateDelay(1000).then((data) => {
    console.log(data)
})

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


const simulateEmbedding = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const numbers = [];
            for(let i=0;i<5;i++){
                numbers.push(Math.floor(Math.random()*10))
                
            }
            resolve(numbers)
        },500)
    })
}

simulateEmbedding().then((data) => {
    console.log(data);
})
