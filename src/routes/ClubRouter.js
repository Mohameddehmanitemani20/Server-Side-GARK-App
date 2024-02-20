const express = require('express');

const router = express.Router();
const Clubcontroller = require('../controllers/ClubController')

// TODO add auth middleware to all the routes
router.post('/', Clubcontroller.createClub);

router.put('/:id', Clubcontroller.modifyClub);

router.get('/allclub', Clubcontroller.getAllClub);

router.get('/allcluballequipesdetail', Clubcontroller.getAllEquipes);

router.get('/alleq/:id', Clubcontroller.getEq);

router.get('/allevent/:id', Clubcontroller.getEvenement);

router.get('/:id', Clubcontroller.getOneClub);

router.get('/byName/:name', Clubcontroller.getClubByName);

//router.get('/byName/:name', Clubcontroller.findClub);

router.delete('/:id', Clubcontroller.deleteOneClub);

router.delete('/all', Clubcontroller.deleteAllClub); //fiha mochekla f mongo yetfas5ouch lkol ta nchoufha
router.get('/allpayment/:id', Clubcontroller.getPayment);

router.get('/alldepanse/:id', Clubcontroller.getDepanses);



module.exports = router;