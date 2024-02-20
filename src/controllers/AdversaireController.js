const Adversaire = require("../models/adversaire.model");

const Equipe = require("../models/equipe.model");



exports.createAdversaire = (req, res, next) => {
    const adversaire = new Adversaire({
        ...req.body
    });
    console.log(req.body.equipe._id)
    const equipe1=Equipe.findOneAndUpdate({ _id: req.body.equipe._id },{$push:{adversaires:adversaire._id}}).exec();
    console.log(equipe1)
    adversaire.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}

exports.modifyAdversaire = async (req, res, next) => {
    Adversaire.updateOne({ _id: req.params.id }, { ...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneAdversaire = (req, res, next) => {
    Adversaire.findOne({ _id: req.params.id }).then(adversaire => res.status(200).json(adversaire)).catch(error => res.status(404).json({ error }));
}

exports.deleteOneAdversaire = async(req, res, next) => {

    try {
        const adversaireId = req.params.id;
        await Adversaire.deleteOne({ _id: adversaireId });
        const filter = { adversaires: adversaireId };
        await Equipe.findOneAndUpdate(filter, {
          $pull: {
            adversaires: adversaireId,
          },
        });
    
        return res.status(200).json({ message: "adversaire deleted" }).send();
      } catch (error) {
        console.log(error);
      }
};