const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: { type: String, required: true },
    sousType: { type: String, required: true },
    montant: { type: String, required: true },
    club: {
        type: Schema.Types.ObjectId,
        ref: "Club"
    }



}, { timestamps: true })



module.exports = mongoose.model('Depanses', schema);