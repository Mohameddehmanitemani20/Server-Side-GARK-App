const Stade = require("../models/stade.model");

const Equipe = require("../models/equipe.model");



exports.createStade = (req, res, next) => {
    const stade = new Stade({
        ...req.body
    });
    console.log(req.body.equipe._id)
    const equipe1=Equipe.findOneAndUpdate({ _id: req.body.equipe._id },{$push:{stades:stade._id}}).exec();
    console.log(equipe1)
    stade.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}

exports.modifyStade = async (req, res, next) => {
    Stade.updateOne({ _id: req.params.id }, { ...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneStade = (req, res, next) => {
    Stade.findOne({ _id: req.params.id }).then(stade => res.status(200).json(stade)).catch(error => res.status(404).json({ error }));
}

exports.deleteOneStade = async(req, res, next) => {

    try {
        const stadeId = req.params.id;
        await Stade.deleteOne({ _id: stadeId });
        const filter = { stades: stadeId };
        await Equipe.findOneAndUpdate(filter, {
          $pull: {
            stades: stadeId,
          },
        });
    
        return res.status(200).json({ message: "stade deleted" }).send();
      } catch (error) {
        console.log(error);
      }
};