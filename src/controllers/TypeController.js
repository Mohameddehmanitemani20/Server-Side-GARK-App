const Type = require("../models/type.model");

const Evenement = require("../models/evenement.model");




exports.createType = (req, res, next) => {
    const type = new Type({
        ...req.body
    });
    console.log(req.body.evenement._id)
    const evenement = Evenement.findOneAndUpdate({ _id: req.body.evenement._id }, { $push: { types: type._id } }).exec();
    console.log(evenement)
    type.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}


exports.modifyType = async(req, res, next) => {
    Type.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneType = (req, res, next) => {
    Type.findOne({ _id: req.params.id }).then(type => res.status(200).json(type)).catch(error => res.status(404).json({ error }));
}

exports.getTypeByName = (req, res, next) => {
    Type.find({ name: req.params.name }).then(type => res.status(200).json(type)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneType = async(req, res, next) => {
    try {
        const typeId = req.params.id;
        await Type.deleteOne({ _id: typeId });
        const filter = { types: typeId };
        await Evenement.findOneAndUpdate(filter, {
            $pull: {
                types: typeId,
            },
        });

        return res.status(200).json({ message: "type deleted" }).send();
    } catch (error) {
        console.log(error);
    }


};

exports.deleteAllType = (req, res, next) => {
    Type.deleteMany().then(type => res.status(200).json(type)).catch(error => res.status(400).json({ error }));
}

exports.findType = (req, res, next) => {
    Type.find().then(type => res.status(200).json(type)).catch(error => res.status(400).json({ error }));
}