const express = require('express')

const router = express.Router();
const auth = require('../middlewares/auth')
const participantController = require('../controllers/ParticipantController')

// TODO add auth middleware to all the routes
router.post('/', participantController.createParticipant);

router.post('/login', participantController.login);

router.get('/', participantController.findParticipant);

router.get('/:id', participantController.getOneParticipant);

router.put('/:id', participantController.modifyParticipant);

router.put('/:id/aa', participantController.modifyParticipant1);

router.delete('/all', participantController.deleteAllParticipants);

router.delete('/:id', participantController.deleteOneParticipant);

router.delete('/byName/:id', participantController.deleteAllParticipantsByName);

router.get('/byName/:name', participantController.getParticipantByName);

router.post('/', participantController.findParticipant);

///checkEmail/:email

router.get('/checkEmail/:email', participantController.checkEmail);




module.exports = router;