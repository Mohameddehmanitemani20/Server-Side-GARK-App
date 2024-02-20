const Remplacant = require("../models/remplacant.model");

const Evenement = require("../models/evenement.model");





exports.createRemplacant = (req, res, next) => {
    const remplacant = new Remplacant({
        ...req.body
    });
    console.log(req.body.evenement._id)
    const evenement = Evenement.findOneAndUpdate({ _id: req.body.evenement._id }, { $push: { remplacantList: remplacant._id } }).exec();
    console.log(evenement)

    remplacant.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}


exports.modifyRemplacant = async(req, res, next) => {
    Remplacant.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneRemplacant = (req, res, next) => {
    Remplacant.findOne({ _id: req.params.id }).then(remplacant => res.status(200).json(remplacant)).catch(error => res.status(404).json({ error }));
}

exports.getRemplacantByName = (req, res, next) => {
    Remplacant.find({ name: req.params.name }).then(remplacant => res.status(200).json(remplacant)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneRemplacant = async(req, res, next) => {
    try {
        const remplacantId = req.params.id;
        await Remplacant.deleteOne({ _id: remplacantId });
        const filter = { remplacantList: remplacantId };
        await Evenement.findOneAndUpdate(filter, {
            $pull: {
                remplacantList: remplacantId,
            },
        });

        return res.status(200).json({ message: "remplacant deleted" }).send();
    } catch (error) {
        console.log(error);
    }


};



exports.findRemplacant = (req, res, next) => {
    Remplacant.find().then(remplacant => res.status(200).json(remplacant)).catch(error => res.status(400).json({ error }));
}