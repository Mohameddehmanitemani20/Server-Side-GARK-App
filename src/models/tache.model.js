const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

        type: {
            type: Schema.Types.ObjectId,
            ref: "Type"
        },
        evenement: {
            type: Schema.Types.ObjectId,
            ref: "Evenement"
        },
        membres1: [{
            type: Schema.Types.ObjectId,
            ref: "Membre"
        }]


    }, { timestamps: true })
    // TODO add filter middleware for reception guys + another role


module.exports = mongoose.model('Tache', schema);