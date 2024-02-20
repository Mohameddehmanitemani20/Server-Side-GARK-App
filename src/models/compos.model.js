const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

        nom: { type: String },
        top: { type: Number },
        left: { type: Number },
        image: { type: String },

        evenement: {
            type: Schema.Types.ObjectId,
            ref: "Evenement"
        },


    }, { timestamps: true })
    // TODO add filter middleware for reception guys + another role


module.exports = mongoose.model('Compos', schema);