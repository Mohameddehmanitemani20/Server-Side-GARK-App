const express = require('express');

const router = express.Router();
const TypeController = require('../controllers/TypeController')



// TODO add auth middleware to all the routes
router.post('/', TypeController.createType);

router.put('/:id', TypeController.modifyType);

router.get('/:id', TypeController.getOneType);

router.get('/byName/:name', TypeController.getTypeByName);

router.get('/byName/:name', TypeController.findType);

router.delete('/:id', TypeController.deleteOneType);

router.delete('/all', TypeController.deleteAllType); //fiha mochekla f mongo yetfas5ouch lkol ta nchoufha



module.exports = router;