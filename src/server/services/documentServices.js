const db = require('../db/documents.js');
const coursesService = require('./coursesService');

function validateDocumentName(name){
     if(typeof name != "string"){
        const err = new Error("Incorrect Datatype of name!");
        throw err;
    }
   const size = name.length;
   if(size<3 || size>200){
       const err = new Error("Length of name must be between 3 to 200 characters!");
       throw err;
    }
   
   const ending = (name.endsWith(".pdf") || name.endsWith(".txt"));
   if (!ending) {
        const err = new Error("System only supports pdf or .txt files for now!");
        throw err;
   }
   return true;
}

async function getAllDocs(course_id){
    await coursesService.getCourseById(course_id);
     const Docs = await db.findAll(course_id);
     return Docs;
}

async function getDocumentById(id){
    const Doc = await db.findById(id);
    if(!Doc){
        const err = new Error(`Doc with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return Doc;
}

async function createDoc(name,course_id){

        validateDocumentName(name);
        await coursesService.getCourseById(course_id);
        const newDoc = await db.create(name,course_id);
        return newDoc;
  
}

async function updateDoc(name,id){
    validateDocumentName(name);
    const updatedDoc = await db.update(name,id);
    if(!updatedDoc){
        const err = new Error(`Doc with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return updatedDoc;
}

async function removeDoc(id){
    const deleteDoc = await db.remove(id);
    if(!deleteDoc){
        const err = new Error(`Doc with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return deleteDoc;
}

module.exports = {validateDocumentName,getAllDocs,getDocumentById,createDoc,updateDoc,removeDoc};