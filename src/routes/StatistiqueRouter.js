const express = require('express');

const router = express.Router();
const StatistiqueController = require('../controllers/StatistiqueController')



// TODO add auth middleware to all the routes
router.post('/', StatistiqueController.createStatistique);

router.put('/:id', StatistiqueController.modifyStatistique);

router.get('/:id', StatistiqueController.getOneStatistique);

router.get('/byName/:name', StatistiqueController.getStatistiqueByName);

router.get('/byName/:name', StatistiqueController.findStatistique);

router.delete('/:id', StatistiqueController.deleteOneStatistique);




module.exports = router;