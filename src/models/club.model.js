const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        nameClub: { type: String, required: true },
        nbMembre: { type: Number, required: true },
        nbEquipe: { type: Number, required: true },
        sport: { type: String, required: true },
        numTel: { type: Number, required: true },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Participant"
        },
        evenements: [{
            type: Schema.Types.ObjectId,
            ref: "Evenement"
        }],
        equipes: [{
            type: Schema.Types.ObjectId,
            ref: "Equipe"
        }],
        payments: [{
            type: Schema.Types.ObjectId,
            ref: "Payment"

        }],
        depanses: [{
            type: Schema.Types.ObjectId,
            ref: "Depanses"

        }],

    }, { timestamps: true })
    // TODO add filter middleware for reception guys + another role


module.exports = mongoose.model('Club', schema);