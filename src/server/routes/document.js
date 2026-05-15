const express = require("express");
const documents = require("../data/MOCK_DATA-documents.json")
const router = express.Router();

router.route("/:courseId/documents")
.get((req,res) => {
    const courseId = Number(req.params.courseId);
    const reqDocs = documents.filter((document) => document.courseId === courseId);
    return res.status(200).json(reqDocs);
})
.post((req,res) => {
    const newDoc = {...req.body,id: documents.length+1};
    documents.push(newDoc);
    return res.status(201).json("Document created successfully!");
})


router.route("/:courseId/documents/:docId")
.get((req,res) => {

    const  docId = Number(req.params.docId);
    const document = documents.find((document) => document.id === docId);
    if(!document){
        return res.status(404).json("There is no document uploaded for this course!");
    }
    return res.status(200).json(document);
})
.delete((req,res) => {
    const docId = Number(req.params.docId);
    const deleteIndex = documents.findIndex((document) => document.id === docId);

    if(deleteIndex === -1){
        return res.status(404).json("Document not found!");
    }
    documents.splice(deleteIndex,1);
    return res.status(200).json("Document deleted successfully!");
})
.patch((req,res) => {
    const docId = Number(req.params.docId);
    const changes = req.body;
    const document = documents.find((document) => document.id === docId);
    if(!document){
        return res.status(404).json("Document does not exist!");
    }
    document.name = changes.newName;
    return res.status(200).json("Document updated successfully!");
})

module.exports = router;