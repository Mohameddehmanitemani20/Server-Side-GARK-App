const express = require('express');

const router = express.Router();
const AdversaireController = require('../controllers/AdversaireController')



// TODO add auth middleware to all the routes
router.post('/', AdversaireController.createAdversaire);

router.put('/:id', AdversaireController.modifyAdversaire);


router.get('/:id', AdversaireController.getOneAdversaire);

router.delete('/:id', AdversaireController.deleteOneAdversaire);



module.exports = router;