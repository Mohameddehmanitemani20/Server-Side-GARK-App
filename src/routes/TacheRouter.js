const express = require('express');

const router = express.Router();
const TacheController = require('../controllers/TacheController')



// TODO add auth middleware to all the routes
router.post('/', TacheController.createTache);

router.put('/:id', TacheController.modifyTache);

router.get('/:id', TacheController.getOneTache);

router.get('/byName/:name', TacheController.getTacheByName);

router.get('/byName/:name', TacheController.findTache);

router.delete('/:id', TacheController.deleteOneTache);



module.exports = router;