const documentServices = require("../services/documentServices.js");

async function getAll(req,res,next) {
    try{
        const course_id = req.params.course_id;
        const user_id = req.user.userId;
        const docs = await documentServices.getAllDocs(course_id,user_id);
        res.status(200).json(docs)
    }catch(err){
         next(err);
    }
}

async function getById(req,res,next) {
    try{
        const id = req.params.id;
        const course_id = req.params.course_id;
        const user_id = req.user.userId;
        const doc = await documentServices.getDocumentById(id,course_id,user_id);
        res.status(200).json(doc);

    }catch(err){
        next(err);
    }
}
async function create(req,res,next){
    try {
        const name = req.body.name;
        const file = req.file;
        const course_id = req.params.course_id;
        const user_id = req.user.userId;
        const newDoc = await documentServices.createDoc(name,course_id,user_id,file);
        res.status(201).json(newDoc);

    } catch (err) {
        next(err);
    }
}
async function update(req,res,next){
    try{
       const newName = req.body.newName;
       const id = req.params.id;
       const course_id = req.params.course_id;
       const user_id = req.user.userId;
       const updatedDoc = await documentServices.updateDoc(newName,id,course_id,user_id);
       res.status(200).json(updatedDoc);
    }catch(err){
        next(err);
    }
}
async function remove(req,res,next){
      try{
        const id = req.params.id;
        const course_id = req.params.course_id;
        const user_id = req.user.userId;
        const deleteDoc = await documentServices.removeDoc(id,course_id,user_id);
        res.status(200).json(deleteDoc);
      }catch(err){
        next(err);
      }
}

module.exports = {create,update,remove,getAll,getById};