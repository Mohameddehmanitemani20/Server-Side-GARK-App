const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

        type: { type: String },
        buts: { type: String, default: 0 },
        assists: { type: String, default: 0 },
        tempsJouee: { type: String, default: 0 },
        cartonJaune: { type: String, default: 0 },
        cartonRouge: { type: String, default: 0 },
        note: { type: String, default: 0 },

        membre: {
            type: Schema.Types.ObjectId,
            ref: "Membre"
        },

        evenement: {
            type: Schema.Types.ObjectId,
            ref: "Evenement"
        },
        equipe: {
            type: Schema.Types.ObjectId,
            ref: "Equipe"
        },

    }, { timestamps: true })
    // TODO add filter middleware for reception guys + another role


module.exports = mongoose.model('Statistique', schema);