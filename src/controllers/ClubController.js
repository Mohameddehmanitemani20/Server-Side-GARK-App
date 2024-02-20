const Club = require("../models/club.model");

const equipes = require("../models/equipe.model");


exports.createClub = (req, res, next) => {
    const club = new Club({
        ...req.body
    });
    club.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}

exports.modifyClub = async(req, res, next) => {
    Club.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneClub = (req, res, next) => {
    Club.findOne({ _id: req.params.id }).then(club => res.status(200).json(club)).catch(error => res.status(404).json({ error }));
}

//jdida
exports.getAllClub = (req, res, next) => {
    Club.find().then(club => res.status(200).json(club)).catch(error => res.status(404).json({ error }));
}


exports.getClubByName = (req, res, next) => {
    Club.find({ nameClub: req.params.name }).then(club => res.status(200).json(club)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneClub = (req, res, next) => {

    Club.deleteOne({ _id: req.params.id }).then(res.status(200).json({ message: "club deleted" })).catch(error => res.status(404).json({ error }));

};

exports.deleteAllClub = (req, res, next) => {
    Club.deleteMany({}).then(club => res.status(200).json(club)).catch(error => res.status(400).json({ error }));
}

exports.findClub = (req, res, next) => {
    Club.find().then(club => res.status(200).json(club)).catch(error => res.status(400).json({ error }));
}

//jdida
exports.getAllEquipes = (req, res) => {
    Club.find({ name: req.params.name }).populate("equipes").then(club => res.status(200).json(club)).catch(error => res.status(400).json({ error }));

}

exports.getEq = async(req, res) => {
    const club = await Club.find({ _id: req.params.id }).populate("equipes");
    try {

        if (club) {

            var clubJson = [];
            // mapping all clubs to retrieve only specific data 
            club.map((c) => {
                clubJson.push({
                    equipe: c.equipes

                })
            });
            res.status(200).json(clubJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

}

exports.getEvenement = async(req, res) => {
        const club = await Club.find({ _id: req.params.id }).populate("evenements");
        try {

            if (club) {

                var clubJson = [];
                // mapping all clubs to retrieve only specific data 
                club.map((c) => {
                    clubJson.push({
                        club: c.evenements

                    })
                });
                res.status(200).json(clubJson);
            }
        } catch (e) {


            res.status(400).json({ error: "Server error !" });
        }

    },
    exports.getPayment = async(req, res) => {
        const club = await Club.find({ _id: req.params.id }).populate("payments");
        try {

            if (club) {

                var clubJson = [];
                // mapping all clubs to retrieve only specific data 
                club.map((c) => {
                    clubJson.push({
                        club: c.payments

                    })
                });
                res.status(200).json(clubJson);
            }
        } catch (e) {


            res.status(400).json({ error: "Server error !" });
        }

    }

exports.getDepanses = async(req, res) => {
    const club = await Club.find({ _id: req.params.id }).populate("depanses");
    try {

        if (club) {

            var clubJson = [];
            // mapping all clubs to retrieve only specific data 
            club.map((c) => {
                clubJson.push({
                    club: c.depanses

                })
            });
            res.status(200).json(clubJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }

}