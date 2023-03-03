const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

let postSchema = new Schema ({
    user: {type: ObjectId, ref: 'user'},
    content: {type: String},
    votes: {type: Number, default: 0},
    date: {type: Date},
});

module.exports = mongoose.model('comment', todoSchema);
