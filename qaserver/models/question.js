var mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    ques : String
})

var Question = mongoose.model('question', questionSchema);

module.exports = Question;