const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    role: { type: String, required: true },
    admin: { type: Boolean, required: true },
    email: { type: String, required: true },
    numTel: { type: Number, required: true },
    poste: { type: String, required: true },
    dateNaissance: { type: String, required: true },
    anneeAriv: { type: String, required: true },
    taille: { type: Number, required: true },
    poids: { type: Number, required: true },
    numMaillot: { type: Number, required: true },
    //ajouter attribut image dans le membre
    img: { type: String },
    etatPresence: { type: String },
    convoquation: { type: Boolean },
    hommeDuMatch: { type: Number },
    // added by me 
    ischecked: { type: Boolean, default: false },
    //
    Equipe: {
        type: Schema.Types.ObjectId,
        ref: "Equipe"
    },
    payments: [{
        type: Schema.Types.ObjectId,
        ref: "Payment"

    }],
}, { timestamps: true })



module.exports = mongoose.model('Membre', schema);