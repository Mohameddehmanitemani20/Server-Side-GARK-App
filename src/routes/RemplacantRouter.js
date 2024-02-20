const express = require('express');

const router = express.Router();
const RemplacantRouter = require('../controllers/RemplacantController')



// TODO add auth middleware to all the routes
router.post('/', RemplacantRouter.createRemplacant);

router.put('/:id', RemplacantRouter.modifyRemplacant);

router.get('/:id', RemplacantRouter.getOneRemplacant);

router.get('/byName/:name', RemplacantRouter.getRemplacantByName);

router.get('/byName/:name', RemplacantRouter.findRemplacant);

router.delete('/:id', RemplacantRouter.deleteOneRemplacant);




module.exports = router;