const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let commentSchema = new Schema ({
    user: {type: ObjectId, ref: 'user'},
    postId: {type: ObjectId, ref: 'post'},
    content: {type: Array},
    votes: {type: Number, default: 0},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('comment', commentSchema);
