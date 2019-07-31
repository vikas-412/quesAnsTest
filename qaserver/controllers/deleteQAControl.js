var mongoose = require("mongoose")

var Question = require('../models/question');
var Answer = require('../models/answer');
var CorrectAnswer = require('../models/correctanswer');

const deleteQAControl = async (req, res) => {
    try {
        console.log(req.body, 'Request body1');
        let deleteQuesPromise = await deleteQues(req.body.question._id);
        let deleteAnsPromise = await deleteAns(req.body.answers);
        let deleteCorrectAnsPromise= await deleteCorrectAns(req.body.correctAns);
        Promise.all([...deleteQuesPromise, ...deleteAnsPromise, ...deleteCorrectAnsPromise]).then(()=>{
            res.send({
                success: true,
                message : "Delete successful"
            })
        })
    } catch (err){
        console.log(err);
    }
}

async function deleteQues(quesId) {
    let deleteQuesPromise = []
    try {
        let deleteQPromise =await Question.findByIdAndDelete(quesId);
        deleteQuesPromise.push(deleteQPromise);
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: 'Question delete database error'
        })
    } finally{
        return deleteQuesPromise;
    }
}
async function deleteAns(answers) {
    let answersDeletedPromise = [];
    try {
        for (answer of answers){
            let ansPromise = await Answer.findByIdAndDelete(answer._id);
            answersDeletedPromise.push(ansPromise);
        }
    } catch (err) {
        console.log(err);
        res.send({
            success : false,
            message: 'Answer delete database error'            
        })
    } finally {
        return answersDeletedPromise;
    }
}
async function deleteCorrectAns(correctAnswers) {
    let correctAnsDeletedPromise=[];
    try {
        for (correctAns of correctAnswers){
            let correctAnsPromise = await CorrectAnswer.findByIdAndDelete(correctAns._id);
            correctAnsDeletedPromise.push(correctAnsPromise);
        }
    } catch(err){
        console.log(err);
        res.send({
            success: false,
            message: 'Answer delete database error'
        })
    } finally {
        return correctAnsDeletedPromise;
    }
}

async function setCorrectAns(quesId, body, res) {
    //undo below if error
    // try {
    //     let finalPromise = Promise.all(opnCAcompletedArray);
    //     finalPromise.then(() => {
    //         res.send({
    //             message: "All operations were successful",
    //             success: true
    //         })
    //     })
    // } catch (err) {
    //     res.send({
    //         message: "Database error while inputting a correct ans",
    //         success: false
    //     })
    // }
}

module.exports = deleteQAControl;