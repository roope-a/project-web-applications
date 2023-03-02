const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MyObjectId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    displayName: {type: String},
    email: {type: String},
    password: {type: String},
    posts: {type: [MyObjectId], ref: 'post'},
    registerDate: {type: Date},
});

userSchema.pre('save', async function(next) {
    const user = this;
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
