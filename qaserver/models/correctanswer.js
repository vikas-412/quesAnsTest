var mongoose = require('mongoose');
var Question = require('./question');
var Answer = require('./answer');

const correctAnswerSchema = mongoose.Schema({
    quesId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'question'
    },
    ansId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'answer'
    }
})

var CorrectAnswer = mongoose.model('correctAnswer', correctAnswerSchema);

module.exports = CorrectAnswer;
