const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

        typechoix: { type: String, required: true },
        nomIcon: { type: Number, required: true },
        evenement: {
            type: Schema.Types.ObjectId,
            ref: "Evenement"
        },




    }, { timestamps: true })
    // TODO add filter middleware for reception guys + another role


module.exports = mongoose.model('Type', schema);