const express = require('express');

const router = express.Router();
const MembreController = require('../controllers/MembreController')



// TODO add auth middleware to all the routes
router.post('/', MembreController.createMembre);


router.put('/:id', MembreController.modifyMembre);

router.get('/:id', MembreController.getOneMembre);

router.get('/byName/:name', MembreController.getMembreByName);

router.get('/byName/:name', MembreController.findMembre);

router.delete('/:id', MembreController.deleteOneMembre);

router.delete('/all', MembreController.deleteAllMembre); //fiha mochekla f mongo yetfas5ouch lkol ta nchoufha

router.post('/a/a/a', MembreController.test2);


  



module.exports = router;