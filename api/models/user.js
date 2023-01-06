const mongoose = require('mongoose');

//Schema for user
const UserSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        firstname:{ type: String, required: true },
        lastname:{ type: String ,  required: true},
        emailaddress: { type: String ,required: true, unique: true}, 
        password:{ type: String, required: true},
});

module.exports = mongoose.model('user', UserSchema);