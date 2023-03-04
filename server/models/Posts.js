const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

let postSchema = new Schema ({
    user: {type: ObjectId, ref: 'user'},
    title: {type: String},
    content: {type: Array},
    comments: {type: [ObjectId], ref: 'comment'},
    votes: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
});

module.exports = mongoose.model('post', postSchema);
