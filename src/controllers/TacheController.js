const Tache = require("../models/tache.model");

const Evenement = require("../models/evenement.model");




exports.createTache = (req, res, next) => {
    const tache = new Tache({
        ...req.body
    });
    console.log(req.body.evenement._id)
    const evenement = Evenement.findOneAndUpdate({ _id: req.body.evenement._id }, { $push: { taches: tache._id } }).exec();
    console.log(evenement)
    tache.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}

exports.modifyTache = async(req, res, next) => {
    Tache.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneTache = (req, res, next) => {
    Tache.findOne({ _id: req.params.id }).then(tache => res.status(200).json(tache)).catch(error => res.status(404).json({ error }));
}

exports.getTacheByName = (req, res, next) => {
    Tache.find({ name: req.params.name }).then(tache => res.status(200).json(tache)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneTache = async(req, res, next) => {
    try {
        const tacheId = req.params.id;
        await Tache.deleteOne({ _id: tacheId });
        const filter = { taches: tacheId };
        await Evenement.findOneAndUpdate(filter, {
            $pull: {
                taches: tacheId,
            },
        });

        return res.status(200).json({ message: "tache deleted" }).send();
    } catch (error) {
        console.log(error);
    }


};



exports.findTache = (req, res, next) => {
    Tache.find().then(tache => res.status(200).json(tache)).catch(error => res.status(400).json({ error }));
}