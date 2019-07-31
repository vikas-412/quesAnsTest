var mongoose = require("mongoose")

var Question = require('../models/question');
var Answer = require('../models/answer');
var CorrectAnswer = require('../models/correctanswer');

const addQuesAnsControl = async (req, res) => {
    try {
        let answersArray = [];
        // let correctAns =[];
        console.log("Request body", req.body);
        let quesData = await Question.create({ ques: req.body.ques });
        let quesId = quesData._id;
        console.log(quesId);
        for (let [key, value] of Object.entries(req.body)) {
            console.log(key, "keyssdasd", typeof key)
            let keysArray = ["ans1", "ans2", "ans3", "ans4"]
            if (keysArray.includes(key)) {
                let ansObj = {
                    ans: value,
                    quesId: quesData._id
                }
                console.log(ansObj, "ansonj")
                try {
                    let answerData = await Answer.create(ansObj);
                    answersArray.push(answerData);
                } catch (err) {
                    res.send({
                        message: "Database error ans",
                        success: false
                    })
                }
            }
        }
        //call the function for correct answer add in database
        await setCorrectAns(quesId, req.body, res).then((value)=>{
            // correctAns = value;
            res.send({
                success : true,
                correctAns : value,
                question : quesData,
                answers : answersArray
            })
        })
    } catch (err) {
        console.log(err);
        res.send({
            message: "Database error ques",
            success: false
        })
    }

}

async function setCorrectAns(quesId, body, res) {
    // var firstTime = 0;
    let opnCAcompletedArray = [];
    try {
        for (let [key, value] of Object.entries(body.rightAns)) {
            if (value) {
                console.log(key, value, "firsttime")
                let correctAns = body[key];
                console.log(correctAns, "correctans");
                let cAnsData;
                try {
                    cAnsData = await Answer.findOne({ ans: correctAns, quesId: quesId });
                } catch (err) {
                    console.log(err)
                    res.send({
                        message: "Database error while finding ans",
                        success: false
                    })
                }
                console.log(cAnsData, 'cAnsData');
                let correctAnsObj = {
                    quesId: quesId,
                    ansId: cAnsData._id
                }
                try {
                    let opnCAcompleted = await CorrectAnswer.create(correctAnsObj);
                    console.log(opnCAcompleted, 'opnCAcompleted');
                    opnCAcompletedArray.push(opnCAcompleted)
                    console.log(opnCAcompletedArray, 'opnCAcompletedArray')
                } catch (err) {
                    res.send({
                        message: "Database error while inputting single correct ans",
                        success: false
                    })
                }
            }
        }//undo below if error
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
    } catch (err) {
        res.send({
            message : "setCorrectAns error",
            success : false
        })
    } finally {
        return opnCAcompletedArray
    }
}

module.exports = addQuesAnsControl;