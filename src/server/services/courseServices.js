const db = require("../db/courses.js");

function validateCourseName(name){
    if(typeof name != "string"){
        const err = new Error("Incorrect Datatype of name!");
        throw err;
    }
    const size = name.length;
    if(size<3 || size>200){
       const err = new Error("Length of name must be between 3 to 200 characters!");
       throw err;
    }
    return true;
}


async function getAllCourses(){
     const courses = await db.findAll();
     return courses;
}

async function getCourseById(id){
    const course = await db.findById(id);
    if(!course){
        const err = new Error(`Course with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return course;
}

async function createCourse(name){

        validateCourseName(name);
        const newCourse = await db.create(name);
        return newCourse;
  
}

async function updateCourse(name,id){
    validateCourseName(name);
    const updatedCourse = await db.update(name,id);
    if(!updatedCourse){
        const err = new Error(`Course with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return updatedCourse;
}

async function removeCourse(id){
    const deleteCourse = await db.remove(id);
    if(!deleteCourse){
        const err = new Error(`Course with id: ${id} does not exist!`);
        err.status = 404;
        throw err;
    }
    return deleteCourse;
}

module.exports = {removeCourse,updateCourse,createCourse,getAllCourses,getCourseById,validateCourseName};
