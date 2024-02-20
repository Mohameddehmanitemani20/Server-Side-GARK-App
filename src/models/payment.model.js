const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    PayedFor: { type: String, required: true },
    PayedBy: { type: String },
    montant: { type: Number, required: true },
    pack: { type: String, required: true },
    type: { type: String },
    fraisDossier: { type: Number, required: true },
    membre: {
        type: Schema.Types.ObjectId,
        ref: "Membre"
    },
    club: {
        type: Schema.Types.ObjectId,
        ref: "Club"
    }




}, { timestamps: true })



module.exports = mongoose.model('Payment', schema);