const buildAnswer = require("./answerService.js");

async function getAnswer(req,res,next){
    try{
        const question = req.body.question;
        const course_id = req.params.course_id;
        const user_id = req.user.userId;
        const answer = await buildAnswer(question,course_id,user_id);
        return res.json({answer});
    }catch(err){
        next(err);
    }
}

module.exports = getAnswer;