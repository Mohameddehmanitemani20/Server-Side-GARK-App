const Depanses = require("../models/depanses.model");

const Club = require("../models/club.model");





exports.createDepanses = (req, res, next) => {
    const depanses = new Depanses({
        ...req.body
    });
    console.log(req.body.club._id)
    const club = Club.findOneAndUpdate({ _id: req.body.club._id }, { $push: { depanses: depanses._id } }).exec();
    console.log(club)

    depanses.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}




exports.modifyDepanses = async(req, res, next) => {
    Depanses.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneDepanses = (req, res, next) => {
    Depanses.findOne({ _id: req.params.id }).then(depanses => res.status(200).json(depanses)).catch(error => res.status(404).json({ error }));
}

exports.getDepansesByName = (req, res, next) => {
    Depanses.find({ name: req.params.name }).then(depanses => res.status(200).json(depanses)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneDepanses = async(req, res, next) => {
    try {
        const depansesId = req.params.id;
        await Depanses.deleteOne({ _id: depansesId });

        const filter = { depanses: depansesId };
        await Club.findOneAndUpdate(filter, {
            $pull: {
                depanses: depansesId,
            },
        });


        return res.status(200).json({ message: "depanses deleted" }).send();
    } catch (error) {
        console.log(error);
    }
};



exports.findDepanses = (req, res, next) => {
    Depanses.find().then(depanses => res.status(200).json(depanses)).catch(error => res.status(400).json({ error }));
}