const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nom: {type: String, required: true},
    nomCourant: {type: String, required: true},
    email: {type: String, required: true},
    telephone: {type: String, required: true},
    equipe: {
        type: Schema.Types.ObjectId,
        ref: "Equipe"
    }
   


}, {timestamps: true})



module.exports = mongoose.model('Adversaire', schema);