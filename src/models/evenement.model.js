const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({

    nomEvenement: { type: String }, //
    description: { type: String },
    jourRecurrence: { type: String },
    dateDebut: { type: String },
    dateFin: { type: String },
    heureDebut: { type: String },
    heureFin: { type: String },
    heureRDV: { type: String },
    lieuEvenement: { type: String },
    lieuRDV: { type: String },
    convocationAutomatique: { type: Boolean },
    avantEvenement: { type: String },
    relanceAutomatique: { type: Boolean },
    listeAttente: { type: Boolean },
    nbParticipant: { type: Number },
    appEventFuturs: { type: Boolean },
    noteJoueur: { type: Number },
    score: { type: String }, //String khater bch tektbou haka "2-1"
    scoreMitemps: { type: String },
    equipeforfait: { type: Boolean },
    butteurs: { type: String },
    assists: { type: String },
    cartonJaune: { type: String },
    cartonRouge: { type: String },

    //matchamical
    format: { type: String },
    nomAdversaire: { type: String },

    //matchentrenous
    couleurs: { type: String },
    //championnat
    nomChampionnat: { type: String },
    numeroJourne: { type: Number },
    //coupe
    nomCoupe: { type: String },
    tourCoupe: { type: String },

    //tournoi kif event
    type: { type: String },

    //entrainement


    club: {
        type: Schema.Types.ObjectId,
        ref: "Club",
    },

    hommeDuMatchList: [String],
    noteDuMatchList: [String],
    presenceList: [String],

    types: [{
        type: Schema.Types.ObjectId,
        ref: "Type"

    }],

    taches: [{
        type: Schema.Types.ObjectId,
        ref: "Tache"

    }],
    presenceListMembre: [{
        type: Schema.Types.ObjectId,
        ref: "Membre"

    }],
    score1: { type: Number },
    score2: { type: Number },
    score1MiTemps: { type: Number },
    score2MiTemps: { type: Number },



    statistiques: [{
        type: Schema.Types.ObjectId,
        ref: "Statistique"

    }],

    equipe: [{
        type: Schema.Types.ObjectId,
        ref: "Equipe"

    }],
    composList: [{
        type: Schema.Types.ObjectId,
        ref: "Compos"

    }],
    remplacantList: [{
        type: Schema.Types.ObjectId,
        ref: "Remplacant"

    }],
    // hommeDuMatchList: [{ id: String, id1: String }],

}, { timestamps: true });

module.exports = mongoose.model("Evenement", schema);