const mongoose = require('mongoose');

const MyObjectId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    user: {type: MyObjectId, ref: 'user'},
    content: {type: String},
    comments: {type: [MyObjectId], ref: 'comment'},
    votes: {type: Number, default: 0},
    date: {type: Date},
});

module.exports = mongoose.model('post', todoSchema);
