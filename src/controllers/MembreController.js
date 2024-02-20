const Membre = require("../models/membre.model");

const Equipe = require("../models/equipe.model");



exports.createMembre = (req, res, next) => {
    const membre = new Membre({
        ...req.body
    });
    console.log(req.body.Equipe._id)
    const equipe = Equipe.findOneAndUpdate({ _id: req.body.Equipe._id }, { $push: { membres: membre._id } }).exec();
    console.log(equipe)
    membre.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}
/**
 * exports.createMembre1 = (req, res, next) => {
    let referral_code = shortid.generate();
    let referrer = req.body.referrer;
    const membre = new Membre({
        ...req.body
    });
    membre.save().then(() => {
        res.status(201).json({referralCode: referral_code})
    }).catch(error => res.status(400).json({ error }));
}
 */



exports.modifyMembre = async (req, res, next) => {
    Membre.updateOne({ _id: req.params.id }, { ...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneMembre = (req, res, next) => {
    Membre.findOne({ _id: req.params.id }).then(membre => res.status(200).json(membre)).catch(error => res.status(404).json({ error }));
}

exports.getMembreByName = (req, res, next) => {
    Membre.find({ name: req.params.name }).then(membre => res.status(200).json(membre)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneMembre = async (req, res, next) => {
    try {
        const memberId = req.params.id;
        await Membre.deleteOne({ _id: memberId });
        const filter = { membres: memberId };
        await Equipe.findOneAndUpdate(filter, {
            $pull: {
                membres: memberId,
            },
        });

        return res.status(200).json({ message: "membre deleted" }).send();
    } catch (error) {
        console.log(error);
    }
};

exports.deleteAllMembre = (req, res, next) => {
    Membre.deleteMany({}).then(membre => res.status(200).json(membre)).catch(error => res.status(400).json({ error }));
}

exports.findMembre = (req, res, next) => {
    Membre.find().then(membre => res.status(200).json(membre)).catch(error => res.status(400).json({ error }));
}

exports.test2 = async (req, res) => {

    try {

    const referral_code = req.body.referral_code;
    const eqp = await Equipe.findOne({ referral_code: referral_code }).select("_id").lean();
    if (eqp) {
        console.log("mawjouda")
        console.log(eqp)
        await Equipe.findOneAndUpdate({ _id: eqp }, { $push: { membres: req.body._id } }).exec();
        return res.send(' found')

    }
    else
        return res.status(404).send('not found')
        
    } catch (e) {
        console.log(e)
        
    }
};
