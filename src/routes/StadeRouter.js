const express = require('express');

const router = express.Router();
const StadeController = require('../controllers/StadeController')



// TODO add auth middleware to all the routes
router.post('/', StadeController.createStade);

router.put('/:id', StadeController.modifyStade);


router.get('/:id', StadeController.getOneStade);

router.delete('/:id', StadeController.deleteOneStade);



module.exports = router;