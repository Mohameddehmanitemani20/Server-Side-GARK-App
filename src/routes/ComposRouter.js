const express = require('express');

const router = express.Router();
const ComposController = require('../controllers/ComposController')



// TODO add auth middleware to all the routes
router.post('/', ComposController.createCompos);

router.put('/:id', ComposController.modifyCompos);

router.get('/:id', ComposController.getOneCompos);

router.get('/byName/:name', ComposController.getComposByName);

router.get('/byName/:name', ComposController.findCompos);

router.delete('/:id', ComposController.deleteOneCompos);



module.exports = router;