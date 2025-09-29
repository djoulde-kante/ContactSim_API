const contactController=require('../controller/controllerContact');

const express = require('express');
const router = express.Router();
router.post('/contacts', contactController.enregistrerContact);

router.get('/contacts', contactController.listerContacts);
router.put('/contacts/:id', contactController.modifierContact);
router.delete('/contacts/:id', contactController.supprimerContact);
module.exports = router;