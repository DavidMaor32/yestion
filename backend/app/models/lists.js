const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const listSchema = new Schema({
    listName: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    Owner: { type: Schema.Types.ObjectId, ref: 'User' },

});

const List = model('List', listSchema);
module.exports = List;
