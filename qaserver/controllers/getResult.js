var mongoose = require("mongoose");

var Question = require('../models/question');
var Answer = require('../models/answer');
var CorrectAnswer = require('../models/correctanswer');

const getResultControl = async (req, res) => {
    try {
        console.log(req.body);
        getScore(req.body).then((scoreData) => {
            res.send({
                success: true,
                scoreData: scoreData
            })
        })
    } catch (err) {
        res.send({
            success: false,
            error: err
        })
    }
}

async function getScore(data) {
    let score = 0;
    // let scoreData = {};
    let details = [];
    let correctAns = [];
    let answers = [];
    try {
        for (element of data) {//Error => (SyntaxError: await is only valid in async function) occurs whenusing forEach() method on data array, so use for loop
            correctAns = []
            let correctAnsArray = await CorrectAnswer.find({ quesId: element.quesId });
            let correct = false;
            let questionObj = await Question.findOne({ _id: element.quesId });
            // if (correctAnsArray.length < 2) {
            //     await singleCorrect(element.marked, correctAnsArray);
            // } else {
            //     correct = await multipleCorrect(element.marked, correctAnsArray);
            // }
            console.log(element.marked, 'markedAnsArray', correctAnsArray, 'correctAns Array');
            await checkCorrect(element.marked, correctAnsArray).then((value) => {
                correct = value
            })
            if (correct) {
                score += 1;
            }
            for (eachElement of correctAnsArray) {
                let correctAnsId = eachElement.ansId;
                let correctAnsObj = await Answer.findOne({ _id: correctAnsId });
                correctAns.push(correctAnsObj.ans);
            }
            await getMarkedAns(element.marked).then((value)=>{
                answers = value
            })
            console.log(correct, 'correct final');
            details.push({
                quesId: element.quesId,
                ques: questionObj.ques,
                correct: correct,
                correctAns: correctAns,
                markedAns : answers
            })
        }
        // return score
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: 'Database error in findiing correct answer'
        })
    } finally {
        let scoreData = {
            score: score,
            details: details
        }
        return scoreData
    }
}

// async function singleCorrect(markedAnsArray, correctAnsArray) {
//     for (markedAns of markedAnsArray) {
//         for (correctAns of correctAnsArray) {
//             if (markedAns.equals(correctAns.ansId)) {
//                 return true
//             }
//         }
//         console.log(markedAns, correct)
//     }
//     return false
// }

// async function multipleCorrect(markedAnsArray, correctAnsArray) {
//     let allCorrect = true
//     for (markedAns of markedAnsArray) {
//         // for (correctAns of correctAnsArray) {
//         //     if (!markedAns.equals(correctAns.ansId)) {
//         //         allCorrect = false
//         //         return allCorrect
//         //     }
//         // }
//         allCorrect = correctAnsArray.some((correctAns) => {
//             return markedAns.equals(correctAns.ansId)
//         })
//         if (!allCorrect){
//             return false
//         }
//         console.log(markedAns, correct)
//     }
//     return allCorrect
// }

async function getMarkedAns(markedArray){
    let answers=[]
    try{
        if (markedArray.length){
            for (ansId of markedArray){
                let singleAns = await Answer.findOne({_id : ansId});
                answers.push(singleAns.ans)
            }
        }
    } catch(err){
        console.log(err,'error in function getMarkedAns')
    } finally {
        return answers
    }
}

async function checkCorrect(markedAnsArray, correctAnsArray) {
    let allCorrect = true
    try {
        console.log('in function', markedAnsArray, correctAnsArray);
        if (markedAnsArray.length != correctAnsArray.length) {
            allCorrect = false;
        } else {
            for (markedAns of markedAnsArray) {
                console.log(typeof (mongoose.Types.ObjectId(markedAns)), typeof (correctAnsArray[0].ansId), 'loop1')
                console.log(markedAns, allCorrect, 'in loop')
                allCorrect = correctAnsArray.some(function (correctAns) {
                    console.log(mongoose.Types.ObjectId(markedAns).equals(correctAns.ansId), "Check if equal")
                    return mongoose.Types.ObjectId(markedAns).equals(correctAns.ansId)
                })
                if (!allCorrect) {
                    allCorrect = false;
                    return
                }
                console.log(markedAns, allCorrect)
            }
        }
    } catch (err) {
        console.log(err, "Error")
    } finally {
        return allCorrect
    }
}

module.exports = getResultControl;