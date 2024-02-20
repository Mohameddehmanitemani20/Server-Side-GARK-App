const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var shortid = require("shortid");

//
const schema = new Schema({
    Name: { type: String, required: true },
    Sport: {
        type: String,
        required: true,
        enum: ["Football", "Handball", "Basketball", "Volley"],
        default: "Football",
    },
    Genre: {
        type: String,
        required: true,
        enum: ["Masculin", "Feminin", "Mixte"],
        default: "Masculin",
    },
    CategorieAge: {
        type: String,
        required: true,
        enum: [
            "Adultes",
            "U5",
            "U6",
            "U7",
            "U8",
            "U9",
            "U10",
            "U11",
            "U12",
            "U13",
            "U14",
            "U15",
            "U16",
            "U18",
            "U19",
            "U20",
        ],
        default: "Adultes",
    },
    Type: {
        type: String,
        required: true,
        enum: [
            "Association",
            "Club",
            "Entreprise",
            "Groupeami",
            "ScolaireUniversitaire",
        ],
        default: "Association",
    },
    Niveau: {
        type: String,
        required: true,
        enum: ["Competition", "loisir", "Match"],
        default: "Competition",
    },
    Ville: { type: String, required: true },
    referral_code: { type: String, required: true, default: shortid.generate },

    club: {
        type: Schema.Types.ObjectId,
        ref: "Club",
    },
    stades: [{
        type: Schema.Types.ObjectId,
        ref: "Stade",
    }],
    adversaires: [{
        type: Schema.Types.ObjectId,
        ref: "Adversaire",
    }],
    //liste des membres
    membres: [{
        type: Schema.Types.ObjectId,
        ref: "Membre",
    }],

    statistiques2: [{
        type: Schema.Types.ObjectId,
        ref: "Statistique",
    }],
    evenements1: [{
        type: Schema.Types.ObjectId,
        ref: "Evenement"
    }],
}, { timestamps: true });

module.exports = mongoose.model("Equipe", schema); // | setPasswordC