const supabase = require('../db/supabaseClient');
const db = require('../db/documentsDB.js');
const coursesService = require('./courseServices');

function validateDocumentName(name){
   
     if(typeof name != "string"){
        const err = new Error("Incorrect Datatype of name!");
        err.status = 400;
        throw err;
    }
    name = name.trim();
   const size = name.length;
   if(size<3 || size>200){
       const err = new Error("Length of name must be between 3 to 200 characters!");
       err.status = 400;
       throw err;
    }
   
   const ending = (name.endsWith(".pdf") || name.endsWith(".txt"));
   if (!ending) {
        const err = new Error("System only supports pdf or .txt files for now!");
        err.status = 400;
        throw err;
   }
   return true;
}

async function getAllDocs(course_id,user_id){
    await coursesService.getCourseById(course_id,user_id);
     const Docs = await db.findAll(course_id);
     return Docs;
}

async function getDocumentById(id,course_id,user_id){
    await coursesService.getCourseById(course_id,user_id);
    const Doc = await db.findById(id,course_id);
    if(!Doc){
        const err = new Error(`Invalid Document or Course Id`);
        err.status = 404;
        throw err;
    }
    return Doc;
}

async function createDoc(name,course_id,user_id,file){
        validateDocumentName(name);
        name = name.trim();
        await coursesService.getCourseById(course_id,user_id);
       
        const filePath = user_id + "/"+ course_id + "/" + Date.now() + "-" + file.originalname;
        const {error} = await supabase.storage.from('documents').upload(filePath,file.buffer,{contentType: file.mimetype});
        if(error) throw error;
        const {data} = supabase.storage.from('documents').getPublicUrl(filePath);
        const newDoc = await db.create(name,course_id,data.publicUrl);
        return newDoc; 
        
}

async function updateDoc(name,id,course_id,user_id){
    await coursesService.getCourseById(course_id,user_id);
    validateDocumentName(name);
    name = name.trim();
    const updatedDoc = await db.update(name,id,course_id);
    if(!updatedDoc){
        const err = new Error(`Invalid Document or Course Id`);
        err.status = 404;
        throw err;
    }
    return updatedDoc;
}

async function removeDoc(id,course_id,user_id){
    await coursesService.getCourseById(course_id,user_id);
    const deleteDoc = await db.remove(id,course_id);
    if(!deleteDoc){
        const err = new Error(`Invalid Documnt or Course Id`);
        err.status = 404;
        throw err;
    }
    return deleteDoc;
}

module.exports = {validateDocumentName,getAllDocs,getDocumentById,createDoc,updateDoc,removeDoc};