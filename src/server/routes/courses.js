const express = require("express");
const courses = require("../data/MOCK_DATA-courses.json");

const router = express.Router();

router.route("/")
.get((req,res) => {
    return res.json(courses);
})
.post((req,res) => {
    const newCourse = {...req.body,id:courses.length+1};
    courses.push(newCourse);
    return res.status(201).json("Created new Document successfully!");
})


router.route("/:id")
.get( (req,res)=> {
    const courseId = Number(req.params.id);
    const course = courses.find((course) => course.id === courseId);
    return res.json(course)
})
.delete((req,res) => {
    const courseId = Number(req.params.id);
    const deleteIndex = courses.findIndex((course) => course.id === courseId);
    if(deleteIndex === -1){
        return res.status(404).json({error: "Course not found"});
    }
    courses.splice(deleteIndex,1);
    console.log(courses);
       return res.status(200).json("Deleted the course successfully");
})
.patch((req,res) => {
    const changes = req.body;
    const courseId = Number(req.params.id);
    const course = courses.find((course) => course.id === courseId);
    if(!course){
        return res.status(404).json({error: "Course not found"});
    }
    course.name = changes.newName;
    console.log(course);
    return res.json("Modifications made successfully");  
})


module.exports = router;