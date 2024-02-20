const express = require('express');

const router = express.Router();
const PaymentController = require('../controllers/PaymentController')



// TODO add auth middleware to all the routes
router.post('/', PaymentController.createPayment);

router.put('/:id', PaymentController.modifyPayment);

router.get('/:id', PaymentController.getOnePayment);

router.get('/byName/:name', PaymentController.getPaymentByName);

router.get('/byName/:name', PaymentController.findPayment);

router.delete('/:id', PaymentController.deleteOnePayment);



  



module.exports = router;