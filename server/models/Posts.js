const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


let postSchema = new Schema ({
    user: {type: ObjectId, ref: 'user'},
    title: {type: String},
    content: {type: Array},
    comments: {type: Number, default: 0},
    votes: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
});

module.exports = mongoose.model('post', postSchema);
