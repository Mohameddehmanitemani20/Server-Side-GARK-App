const express = require("express");

const router = express.Router();
const Equipecontroller = require("../controllers/EquipeController");

// TODO add auth middleware to all the routes
router.post("/", Equipecontroller.createEquipe);

router.post("/aa", Equipecontroller.createEquipe1);

router.put("/:id", Equipecontroller.modifyEquipe);

router.get("/getAll", Equipecontroller.getAll);

router.get("/:id", Equipecontroller.getOneEquipe);

router.get("/:id/aa", Equipecontroller.getOneInvitation);

router.get("/allstades/:id", Equipecontroller.getStade);

router.get("/alladversaire/:id", Equipecontroller.getAdversaire);

router.get("/byName/:name", Equipecontroller.getEquipeByName);

router.get("/allmembre/:id", Equipecontroller.getMembreselonideq);


router.get("/byName/:name", Equipecontroller.findEquipe);

router.delete("/:id", Equipecontroller.deleteOneEquipe);

router.delete("/all", Equipecontroller.deleteAllEquipe); //fiha mochekla f mongo yetfas5ouch lkol ta nchoufha

router.get("/aa/:referral_code", Equipecontroller.getidbyrefferelcode); //ps dispo

router.get("/statistique/:id", Equipecontroller.getStatistiques);

router.get("/event/:id", Equipecontroller.getevenements);
module.exports = router;