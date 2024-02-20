const express = require('express');

const router = express.Router();
const DepansesController = require('../controllers/DepansesController')



// TODO add auth middleware to all the routes
router.post('/', DepansesController.createDepanses);

router.put('/:id', DepansesController.modifyDepanses);

router.get('/:id', DepansesController.getOneDepanses);

router.get('/byName/:name', DepansesController.getDepansesByName);

router.get('/byName/:name', DepansesController.findDepanses);

router.delete('/:id', DepansesController.deleteOneDepanses);



  



module.exports = router;