var mongooe = require('mongoose');
var Question = require('../models/question');
var Answer = require('../models/answer');
var CorrectAnswer = require('../models/correctanswer');

const sendTestPaperControl = async (req, res) => {
    try {
        getAllQues().then((value) => {
            let allQuesArray = value;
            console.log(allQuesArray)
            if (!allQuesArray.length) {
                res.send({
                    success: false,
                    message: 'No questions present in databse, please add them.'
                })
            } else {
                getDataToSend(allQuesArray).then((value) => {
                    console.log(value, "Finally-----------");
                    if (value.length) {
                        console.log(value, "Finally--2")
                        res.send({
                            success: true,
                            message: "Test paper",
                            testPaper: value
                        })
                    }
                })
            }
        });
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: 'Server error '
        })
    }
}

async function getAllQues() {
    let allQuesArray = []
    try {
        allQuesArray = await Question.find({})
    } catch (err) {
        console.log(err);
        allQuesArray = []
        res.send({
            success: false,
            message: 'Database error in finding questions'
        })
    }
    finally {
        return allQuesArray
    }
}

async function findAnsOfAQues(quesData) {
    console.log(quesData, 'quesData')
    let answers = [];
    let correctAnsArray = [];
    let multipleCorrect = false;
    try {
        answers = await Answer.find({ quesId: quesData._id })
        correctAnsArray = await CorrectAnswer.find({ quesId: quesData._id })
        if (correctAnsArray.length > 1) {
            multipleCorrect = true;
        }
    } catch (err) {
        answers = [];
        correctAnsArray = [];
        res.send({
            success: false,
            message: 'Database error in finding answers'
        })
    } finally {
        let answersData = {
            multipleCorrect: multipleCorrect,
            answers: answers
        }
        console.log(answersData, 'answers')
        return answersData
    }
}

async function getDataToSend(allQuesArray) {
    let dataToSend = [];
    for (quesData of allQuesArray) {
        await findAnsOfAQues(quesData).then((value) => {// Use of await here!!!!!!!!!!!!1
            let data = {
                question: quesData,
                answers: value.answers,
                multipleCorrect : value.multipleCorrect
            }
            console.log(data, 'data')
            dataToSend.push(data);
            console.log(dataToSend, 'asdasd')
        });
    }
    return dataToSend
}


module.exports = sendTestPaperControl;
