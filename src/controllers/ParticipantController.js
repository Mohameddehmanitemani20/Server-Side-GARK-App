const Participant = require("../models/participant.model");

require("dotenv").config();

const bcrypt = require("bcrypt");

exports.createParticipant = async (req, res, next) => {
  const participant = new Participant({
    ...req.body,
  });
  // if the body of the request don't contain a password generate one and save it
  if (!req.body.password) {
    participant.setPassword().then(() =>
      participant
        .save()
        .then(() => {
          res.status(201).json({ message: "objet created" });
        })
        .catch((error) => res.status(400).json({ error }))
    );
  } else {
    // if it contains a password, crypt it then save it
    await bcrypt
      .hash(req.body.password, Number.parseInt(process.env.CRYPT_SALT))
      .then((hash) => {
        participant.password = hash;
      })
      .catch((err) => ({ err }));
    participant
      .save()
      .then(() => {
        res.status(201).json({ message: "objet created" });
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.login = (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }
  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  Participant.findOne({ email: req.body.email })
    .then((participant) => {
      if (!participant) {
        return res.status(401).json({ error: " can't find participant " });
      }
      participant.verifyPassword(req.body.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: " password don't match " });
        }
        res.status(200).json({
          participantId: participant._id,
          participantClub: participant.club,
          token: participant.generateToken(),
        });
      });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.findParticipant = (req, res, next) => {
  Participant.find()
    .then((participants) => res.status(200).json(participants))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneParticipant = (req, res, next) => {
  Participant.findOne({ _id: req.params.id })
    .then((participant) => res.status(200).json(participant))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyParticipant = async (req, res, next) => {
  if (req.body.password) {
    console.log(req.body.password);
    await bcrypt
      .hash(req.body.password, Number.parseInt(process.env.CRYPT_SALT))
      .then((hash) => {
        req.body.password = hash;
      })
      .catch((err) => ({ err }));
  }
  Participant.updateOne({ _id: req.params.id }, { ...req.body })
    .then(res.status(200).json({ message: "update done" }))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteOneParticipant = (req, res, next) => {
  // TODO uncomment the code below when applying security
  // Participant.findOne({_id: req.params.id}).then((participant) => {
  //     if (!participant) {
  //         res.status(404).json({
  //             error: new Error('No such participant   !')
  //         });
  //     }
  //     if (participant.userId !== req.auth.userId) {
  //         res.status(400).json({
  //             error: new Error('Unauthorized request!')
  //         })
  //     }
  Participant.deleteOne({ _id: req.params.id })
    .then(res.status(200).json({ message: "participant deleted" }))
    .catch((error) => res.status(404).json({ error }));
  //})
};

exports.getParticipantByName = (req, res, next) => {
  Participant.find({ name: req.params.name })
    .then((participants) => res.status(200).json(participants))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAllParticipantsByName = (req, res, next) => {
  Participant.deleteMany({ name: req.params.name })
    .then((participants) => res.status(200).json(participants))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteAllParticipants = (req, res, next) => {
  Participant.deleteMany({})
    .then((participants) => res.status(200).json(participants))
    .catch((error) => res.status(400).json({ error }));
};

exports.checkEmail=(req, res, next) => {
  Participant.findOne({ email : req.params.email}, (err, Result) => {
    if (err) return res.status(500).json({ msg : err });
    if (Result !== null){
      return res.json({ 
        Status: true,
      })
    }else return res.json({
      Status: false,
    });
  });
};

exports.modifyParticipant1 = async (req, res, next) => {
  Participant.updateOne({ _id: req.params.id }, { ...req.body }).then(res.status(200).json({ message: "update done" })).catch(error => res.status(404).json({ error }));
}




