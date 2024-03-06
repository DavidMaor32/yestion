const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const listSchema = new Schema({
    listName: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    Owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    isFavorite: { type: Boolean, default: false },
    description: { type: String, default: '' },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]            

});

const List = model('List', listSchema);
module.exports = List;
