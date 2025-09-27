// Importation du module express
const express = require("express");


const router = express.Router();


const contacts = [
  { id: 1, nom: "Sams Deen", numero: "610935524" },
  { id: 2, nom: "Kanté", numero: "625654565" },
  { id: 3, nom: "Bailo", numero: "620331205" }
];


router.get("/", (req, res) => {
 
  const minimal = contacts.map(({ nom, numero }) => ({ nom, numero }));
 
  res.status(200).json(minimal);
});


router.get("/:id", (req, res) => {
  
  const id = parseInt(req.params.id);
 
  const contact = contacts.find(c => c.id === id);

  
  if (!contact) {
    return res.status(404).json({ message: "Contact non trouvé" });
  }


  res.status(200).json({ nom: contact.nom, numero: contact.numero });
});


module.exports = router;

