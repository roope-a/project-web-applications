const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let userSchema = new Schema ({
    displayName: {type: String},
    email: {type: String},
    password: {type: String},
    posts: {type: [ObjectId], ref: 'post'},
    registerDate: {type: Date, default: Date.now},
});

userSchema.pre('save', async function(next) {

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
);

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};


module.exports = mongoose.model('user', userSchema);
