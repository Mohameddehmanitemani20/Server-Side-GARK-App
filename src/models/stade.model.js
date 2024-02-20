const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nom: {type: String, required: true},
    adresse: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    acces: {type: String, required: true},
    infos: {type: String, required: true},
    equipe: {
        type: Schema.Types.ObjectId,
        ref: "Equipe"
    }
   


}, {timestamps: true})



module.exports = mongoose.model('Stade', schema);