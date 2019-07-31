var mongoose = require('mongoose');
var Question = require("./question");

const answerSchema = mongoose.Schema({
    ans : String,
    quesId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'question'
    }
})

var Answer = mongoose.model('answer', answerSchema);

module.exports = Answer;