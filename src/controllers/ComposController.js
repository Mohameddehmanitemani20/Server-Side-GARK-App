const Compos = require("../models/compos.model");

const Evenement = require("../models/evenement.model");





exports.createCompos = (req, res, next) => {
    const compos = new Compos({
        ...req.body
    });
    console.log(req.body.evenement._id)
    const evenement = Evenement.findOneAndUpdate({ _id: req.body.evenement._id }, { $push: { composList: compos._id } }).exec();
    console.log(evenement)

    compos.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}


exports.modifyCompos = async(req, res, next) => {
    Compos.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneCompos = (req, res, next) => {
    Compos.findOne({ _id: req.params.id }).then(compos => res.status(200).json(compos)).catch(error => res.status(404).json({ error }));
}

exports.getComposByName = (req, res, next) => {
    Compos.find({ name: req.params.name }).then(compos => res.status(200).json(compos)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneCompos = async(req, res, next) => {
    try {
        const composId = req.params.id;
        await Compos.deleteOne({ _id: composId });
        const filter = { composList: composId };
        await Evenement.findOneAndUpdate(filter, {
            $pull: {
                composList: composId,
            },
        });

        return res.status(200).json({ message: "compos deleted" }).send();
    } catch (error) {
        console.log(error);
    }


};



exports.findCompos = (req, res, next) => {
    Compos.find().then(compos => res.status(200).json(compos)).catch(error => res.status(400).json({ error }));
}