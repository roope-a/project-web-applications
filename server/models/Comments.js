const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

let commentSchema = new Schema ({
    user: {type: ObjectId, ref: 'user'},
    postId: {type: ObjectId, ref: 'post'},
    content: {type: Array},
    votes: {type: Number, default: 0},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('comment', commentSchema);
