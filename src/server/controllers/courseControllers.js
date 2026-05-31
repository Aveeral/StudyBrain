const courseServices = require("../services/courseServices.js");

async function getAll(req,res,next) {
    try{
        const user_id = req.user.userId;
        const courses = await courseServices.getAllCourses(user_id);
        res.status(200).json(courses)
    }catch(err){
         next(err);
    }
}

async function getById(req,res,next) {
    try{
        const user_id = req.user.userId;
        const id = req.params.id;
        const course = await courseServices.getCourseById(id,user_id);
        res.status(200).json(course);

    }catch(err){
        next(err);
    }
}
async function create(req,res,next){
    try {
        const user_id = req.user.userId;
        const name = req.body.name;
        const newCourse = await courseServices.createCourse(name,user_id);
        res.status(201).json(newCourse);

    } catch (err) {
        next(err);
    }
}
async function update(req,res,next){
    try{
       const user_id = req.user.userId;
       const newName = req.body.newName;
       const id = req.params.id;
       const updatedCourse = await courseServices.updateCourse(newName,id,user_id);
       res.status(200).json(updatedCourse);
    }catch(err){
        next(err);
    }
}
async function remove(req,res,next){
      try{
        const user_id = req.user.userId;
        const id = req.params.id;
        const deleteCourse = await courseServices.removeCourse(id,user_id);
        res.status(200).json(deleteCourse);
      }catch(err){
        next(err);
      }
}

module.exports = {create,update,remove,getAll,getById};
