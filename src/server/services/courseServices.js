const db = require("../db/coursesDB.js");

function validateCourseName(name){
    
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
    return true;
}


async function getAllCourses(user_id){
     const courses = await db.findAll(user_id);
     return courses;
}

async function getCourseById(id,user_id){
    const course = await db.findById(id,user_id);
    if(!course){
        const err = new Error(`Course with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return course;
}

async function createCourse(name,user_id){
        validateCourseName(name);
        name = name.trim();
        const newCourse = await db.create(name,user_id);
        return newCourse;
  
}

async function updateCourse(name,id,user_id){
    validateCourseName(name);
    name = name.trim();
    const updatedCourse = await db.update(name,id,user_id);
    if(!updatedCourse){
        const err = new Error(`Course with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return updatedCourse;
}

async function removeCourse(id,user_id){
    const deleteCourse = await db.remove(id,user_id);
    if(!deleteCourse){
        const err = new Error(`Course with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return deleteCourse;
}

module.exports = {removeCourse,updateCourse,createCourse,getAllCourses,getCourseById,validateCourseName};
