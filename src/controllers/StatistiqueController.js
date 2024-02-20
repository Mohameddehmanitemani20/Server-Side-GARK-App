const Statistique = require("../models/statistique.model");

const Evenement = require("../models/evenement.model");
const Membre = require("../models/membre.model");
const Equipe = require("../models/equipe.model");






exports.createStatistique = (req, res, next) => {
    const statistique = new Statistique({
        ...req.body
    });
    console.log(req.body.evenement._id)
    const evenement = Evenement.findOneAndUpdate({ _id: req.body.evenement._id }, { $push: { statistiques: statistique._id } }).exec();
    console.log(evenement)

    console.log(req.body.membre._id)
    const membre = Membre.findOneAndUpdate({ _id: req.body.membre._id }, { $push: { statistiques1: statistique._id } }).exec();
    console.log(membre)

    console.log(req.body.equipe._id)
    const equipe = Equipe.findOneAndUpdate({ _id: req.body.equipe._id }, { $push: { statistiques2: statistique._id } }).exec();
    console.log(equipe)
    statistique.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}


exports.modifyStatistique = async(req, res, next) => {
    Statistique.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneStatistique = (req, res, next) => {
    Statistique.findOne({ _id: req.params.id }).then(statistique => res.status(200).json(statistique)).catch(error => res.status(404).json({ error }));
}

exports.getStatistiqueByName = (req, res, next) => {
    Statistique.find({ name: req.params.name }).then(statistique => res.status(200).json(statistique)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneStatistique = async(req, res, next) => {
    try {
        const statistiqueId = req.params.id;
        await Statistique.deleteOne({ _id: statistiqueId });
        const filter = { statistiques: statistiqueId };
        await Evenement.findOneAndUpdate(filter, {
            $pull: {
                statistiques: statistiqueId,
            },
        });

        const filter1 = { statistiques1: statistiqueId };
        await Membre.findOneAndUpdate(filter1, {
            $pull: {
                statistiques1: statistiqueId,
            },
        });

        const filter2 = { statistiques2: statistiqueId };
        await Equipe.findOneAndUpdate(filter2, {
            $pull: {
                statistiques2: statistiqueId,
            },
        });

        return res.status(200).json({ message: "statistique deleted" }).send();
    } catch (error) {
        console.log(error);
    }


};



exports.findStatistique = (req, res, next) => {
    Statistique.find().then(statistique => res.status(200).json(statistique)).catch(error => res.status(400).json({ error }));
}