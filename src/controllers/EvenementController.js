const Evenement = require("../models/evenement.model");

const Club = require("../models/club.model");
const Equipe = require("../models/equipe.model");





exports.createEvenement = (req, res, next) => {
    const evenement = new Evenement({
        ...req.body
    });
    console.log(req.body.club._id)
    const club = Club.findOneAndUpdate({ _id: req.body.club._id }, { $push: { evenements: evenement._id } }).exec();
    console.log(club)

    console.log(req.body.equipe._id)
    const equipe = Equipe.findOneAndUpdate({ _id: req.body.equipe._id }, { $push: { evenements1: evenement._id } }).exec();
    console.log(equipe)
    evenement.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}


exports.modifyEvenement = async(req, res, next) => {
    Evenement.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOneEvenement = (req, res, next) => {
    Evenement.findOne({ _id: req.params.id }).then(evenement => res.status(200).json(evenement)).catch(error => res.status(404).json({ error }));
}

exports.getEvenementtByName = (req, res, next) => {
    Evenement.find({ name: req.params.name }).then(evenement => res.status(200).json(evenement)).catch(error => res.status(400).json({ error }));
}

exports.deleteOneEvenement = async(req, res, next) => {

    try {
        const evenementId = req.params.id;
        await Evenement.deleteOne({ _id: evenementId });
        const filter = { evenements: evenementId };
        await Club.findOneAndUpdate(filter, {
            $pull: {
                evenements: evenementId,
            },
        });

        const filter1 = { evenements1: evenementId };
        await Equipe.findOneAndUpdate(filter1, {
            $pull: {
                evenements1: evenementId,
            },
        });

        return res.status(200).json({ message: "evenement deleted" }).send();
    } catch (error) {
        console.log(error);
    }
};

exports.deleteAllEvenement = (req, res, next) => {
    Evenement.deleteMany({ _id: { $gte: 2 } }).then(evenement => res.status(200).json(evenement)).catch(error => res.status(400).json({ error }));
}

exports.findEvenement = (req, res, next) => {
    Evenement.find().then(evenement => res.status(200).json(evenement)).catch(error => res.status(400).json({ error }));
}

exports.getPresenceList = async(req, res) => {
    const evenement = await Evenement.find({ _id: req.params.id }).populate("presenceList");
    try {

        if (evenement) {

            var evenementJson = [];
            // mapping all clubs to retrieve only specific data 
            evenement.map((c) => {
                evenementJson.push({
                    evenement: c.presenceList

                })
            });
            res.status(200).json(evenementJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }
}


exports.getHommeDuMatch = async(req, res) => {

    const data = await Evenement.findOne({ _id: req.params.id });
    console.log(data);
    count = data.hommeDuMatchList
        .reduce((r, { id }) => {
            r[id] = r[id] || { id, occurences: 0 };
            r[id].occurences++;
            return r;
        }, {}),
        top1 = Object
        .values(count)
        .sort((a, b) => b.occurences - a.occurences)
        .slice(0, 1);

    return res.status(200).json(top1);
}


/**moyenne taa les notes
 * exports.getNoteDuMatch=async(req,res)=>{

    const data=await Evenement.findOne({_id: req.params.id }) ; 
    console.log(data);
       count = data.noteDuMatchList
         .reduce((r, { id }) => {
             r[id] = r[id] || { id, occurences: 0 };
             r[id].occurences++;
             return r;
         }, {}),
     top1 = Object
         .values(count)
         .sort((a, b) => b.occurences - a.occurences)
         .slice(0, 1);
 
         return res.status(200).json(top1);
     }
 */

exports.getListtypes = async(req, res) => {
    const evenement = await Evenement.find({ _id: req.params.id }).populate("types");
    try {

        if (evenement) {

            var evenementJson = [];
            // mapping all clubs to retrieve only specific data 
            evenement.map((c) => {
                evenementJson.push({
                    evenement: c.types

                })
            });
            res.status(200).json(evenementJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }
}

exports.getListtaches = async(req, res) => {
    const evenement = await Evenement.find({ _id: req.params.id }).populate("taches");
    try {

        if (evenement) {

            var evenementJson = [];
            // mapping all clubs to retrieve only specific data 
            evenement.map((c) => {
                evenementJson.push({
                    evenement: c.taches

                })
            });
            res.status(200).json(evenementJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }
}

exports.getListstatistiques = async(req, res) => {
    const evenement = await Evenement.find({ _id: req.params.id }).populate("statistiques");
    try {

        if (evenement) {

            var evenementJson = [];
            // mapping all clubs to retrieve only specific data 
            evenement.map((c) => {
                evenementJson.push({
                    evenement: c.statistiques

                })
            });
            res.status(200).json(evenementJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }
}

exports.getListcompos = async(req, res) => {
    const evenement = await Evenement.find({ _id: req.params.id }).populate("composList");
    try {

        if (evenement) {

            var evenementJson = [];
            // mapping all clubs to retrieve only specific data 
            evenement.map((c) => {
                evenementJson.push({
                    evenement: c.composList

                })
            });
            res.status(200).json(evenementJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }
}

exports.getListremplacant = async(req, res) => {
    const evenement = await Evenement.find({ _id: req.params.id }).populate("remplacantList");
    try {

        if (evenement) {

            var evenementJson = [];
            // mapping all clubs to retrieve only specific data 
            evenement.map((c) => {
                evenementJson.push({
                    evenement: c.remplacantList

                })
            });
            res.status(200).json(evenementJson);
        }
    } catch (e) {


        res.status(400).json({ error: "Server error !" });
    }
}