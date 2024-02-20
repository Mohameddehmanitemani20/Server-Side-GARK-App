const Equipe = require("../models/equipe.model");

const Club = require("../models/club.model");

var shortid = require('shortid');



exports.createEquipe = (req, res, next) => {
    const equipe = new Equipe({
        ...req.body
    });
    console.log(req.body.club._id)
    const club = Club.findOneAndUpdate({ _id: req.body.club._id }, { $push: { equipes: equipe._id } }).exec();
    console.log(club)

    equipe.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}


exports.createEquipe1 = (req, res, next) => {
    let referral_code = shortid.generate();
    let referrer = req.body.referrer;
    const equipe = new Equipe({
        ...req.body
    });
    equipe.save().then(() => {
        res.status(201).json({ referralCode: referral_code })
    }).catch(error => res.status(400).json({ error }));
}


exports.modifyEquipe = async(req, res, next) => {
    Equipe.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getAll = (req, res, next) => {
    Equipe.find().then(equipe => res.status(200).json(equipe)).catch(error => res.status(400).json({ error }));
}

exports.getOneInvitation = (req, res, next) => {
    Equipe.findOne({ _id: req.params.id }).then(equipe => res.status(200).json(equipe.referral_code)).catch(error => res.status(404).json({ error }));
}

exports.getOneEquipe = (req, res, next) => {
    Equipe.findOne({ _id: req.params.id }).then(equipe => res.status(200).json(equipe)).catch(error => res.status(404).json({ error }));
}

exports.getEquipeByName = (req, res, next) => {
    Equipe.find({ name: req.params.name }).then(equipe => res.status(200).json(equipe)).catch(error => res.status(400).json({ error }));
}

exports.getStade = async(req, res) => {
    const equipe = await Equipe.find({ _id: req.params.id }).populate("stades");
    try {

        if (equipe) {

            var equipeJson = [];
            // mapping all clubs to retrieve only specific data adversaires
            equipe.map((c) => {
                equipeJson.push({
                    equipe: c.stades

                })
            });
            res.status(200).json(equipeJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

};

exports.getAdversaire = async(req, res) => {
    const equipe = await Equipe.find({ _id: req.params.id }).populate("adversaires");
    try {

        if (equipe) {

            var equipeJson = [];
            // mapping all clubs to retrieve only specific data adversaires
            equipe.map((c) => {
                equipeJson.push({
                    equipe: c.adversaires

                })
            });
            res.status(200).json(equipeJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

};

exports.deleteOneEquipe = async(req, res, next) => {
    try {
        const equipeId = req.params.id;
        await Equipe.deleteOne({ _id: equipeId });
        const filter = { equipes: equipeId };
        await Club.findOneAndUpdate(filter, {
            $pull: {
                equipes: equipeId,
            },
        });

        return res.status(200).json({ message: "equipe deleted" }).send();
    } catch (error) {
        console.log(error);
    }


};

exports.deleteAllEquipe = (req, res, next) => {
    Equipe.deleteMany({}).then(equipe => res.status(200).json(equipe)).catch(error => res.status(400).json({ error }));
}

exports.findEquipe = (req, res, next) => {
    Equipe.find().then(equipe => res.status(200).json(equipe)).catch(error => res.status(400).json({ error }));
}

exports.getidbyrefferelcode = (req, res, next) => {

    Equipe.findOne({ referral_code: req.params.referral_code }).then(equipe => res.status(200).json(equipe)).catch(error => res.status(404).json({ error }));
}

exports.getMembreselonideq = async(req, res) => {
    const equipe = await Equipe.find({ _id: req.params.id }).populate("membres");
    try {

        if (equipe) {

            var clubJson = [];
            // mapping all clubs to retrieve only specific data 
            equipe.map((c) => {
                clubJson.push({
                    membre: c.membres

                })
            });
            res.status(200).json(clubJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

}


exports.getStatistiques = async(req, res) => {
    const equipe = await Equipe.find({ _id: req.params.id }).populate("statistiques2");
    try {

        if (equipe) {

            var equipeJson = [];
            // mapping all clubs to retrieve only specific data adversaires
            equipe.map((c) => {
                equipeJson.push({
                    equipe: c.statistiques2

                })
            });
            res.status(200).json(equipeJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

};
exports.getevenements = async(req, res) => {
    const equipe = await Equipe.find({ _id: req.params.id }).populate("evenements1");
    try {

        if (equipe) {

            var equipeJson = [];
            // mapping all clubs to retrieve only specific data adversaires
            equipe.map((c) => {
                equipeJson.push({
                    equipe: c.evenements1

                })
            });
            res.status(200).json(equipeJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

};