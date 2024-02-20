const Payment = require("../models/payment.model");

const Membre = require("../models/membre.model");
const Club = require("../models/club.model");






exports.createPayment = (req, res, next) => {
    const payment = new Payment({
        ...req.body
    });
    console.log(req.body.membre._id)
    const membre = Membre.findOneAndUpdate({ _id: req.body.membre._id }, { $push: { payments: payment._id } }).exec();
    console.log(membre)
    console.log(req.body.club._id)
    const club = Club.findOneAndUpdate({ _id: req.body.club._id }, { $push: { payments: payment._id } }).exec();
    console.log(club)
    payment.save().then(() => {
        res.status(201).json({ message: 'objet crée' })
    }).catch(error => res.status(400).json({ error }));
}




exports.modifyPayment = async(req, res, next) => {
    Payment.updateOne({ _id: req.params.id }, {...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}

exports.getOnePayment = (req, res, next) => {
    Payment.findOne({ _id: req.params.id }).then(payment => res.status(200).json(payment)).catch(error => res.status(404).json({ error }));
}

exports.getPaymentByName = (req, res, next) => {
    Payment.find({ name: req.params.name }).then(payment => res.status(200).json(payment)).catch(error => res.status(400).json({ error }));
}

exports.deleteOnePayment = async(req, res, next) => {
    try {
        const paymentId = req.params.id;
        await Payment.deleteOne({ _id: paymentId });

        const filter = { payments: paymentId };
        await Membre.findOneAndUpdate(filter, {
            $pull: {
                payments: paymentId,
            },
        });

        const filter1 = { payments: paymentId };
        await Club.findOneAndUpdate(filter1, {
            $pull: {
                payments: paymentId,
            },
        });
        return res.status(200).json({ message: "payment deleted" }).send();
    } catch (error) {
        console.log(error);
    }
};



exports.findPayment = (req, res, next) => {
    Payment.find().then(payment => res.status(200).json(payment)).catch(error => res.status(400).json({ error }));
}