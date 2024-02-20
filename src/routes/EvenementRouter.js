const express = require('express');

const router = express.Router();
const EvenementController = require('../controllers/EvenementController')



// TODO add auth middleware to all the routes
router.post('/', EvenementController.createEvenement);

router.put('/:id', EvenementController.modifyEvenement);

router.get('/:id', EvenementController.getOneEvenement);

router.get('/byName/:name', EvenementController.getEvenementtByName);

router.get('/byName/:name', EvenementController.findEvenement);

router.get('/presence/:id', EvenementController.getPresenceList);

router.get('/type/:id', EvenementController.getListtypes);

router.get('/tache/:id', EvenementController.getListtaches);
router.get('/statistique/:id', EvenementController.getListstatistiques);



router.get('/hommedumatch/:id', EvenementController.getHommeDuMatch);

/**router.get('/notedumatch/:id', EvenementController.getNoteDuMatch);
 */



router.delete('/:id', EvenementController.deleteOneEvenement);

router.delete('/all', EvenementController.deleteAllEvenement); //fiha mochekla f mongo yetfas5ouch lkol ta nchoufha
router.get('/compos/:id', EvenementController.getListcompos);

router.get('/remplacant/:id', EvenementController.getListremplacant);




module.exports = router;