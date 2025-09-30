const modelContact = require('../models/modelContact');

//  méthode pour enregistrer un nouveau contact
exports.enregistrerContact = async (req, res)=>{
    const {nom,telephone} = req.body;
    if(!nom || !telephone){
        return res.status(400).json({message:"Le nom et le téléphone sont obligatoires"});
    }
    if(telephone.length !== 9 || !/^[0-9]+$/.test(telephone)){
        return res.status(400).json({message:"Le numéro de téléphone doit contenir 9 chiffres"});
    }
    try{
        const contact = new modelContact({nom,telephone});
        await contact.save();
        res.status(200).json(contact);
    }catch(error){
        res.status(400).json({message:error.message});
    };}

    // méthode pour récuperer tous les contacts
    exports.listerContacts = async (req, res)=>{
        try{
            const contacts = await modelContact.findAll();
            res.status(200).json(contacts);
        }catch(error){
            res.status(400).json({message:error.message});
        };}

    // méthode pour récupérer un seul contact par son id
    exports.listerContact = async (req, res) => {
        const { id } = req.params;
        try {
            const contact = await modelContact.findByPk(id);
            if (!contact) {
                return res.status(404).json({ message: "Contact non trouvé" });
            }
            res.status(200).json(contact);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

// méthode pour modifier un contact
exports.modifierContact = async (req, res)=>{
    const {id} = req.params;
    const {nom,telephone} = req.body;
    try{
        const [updatedRows] = await modelContact.update({ nom, telephone }, { where: { id } });
        if(updatedRows === 0){
            return res.status(404).json({message:"Contact non trouvé"});
        }
        const contact = await modelContact.findByPk(id);
        res.status(200).json({message:"Contact modifié avec succès", contact});
    }catch(error){
        res.status(400).json({message:error.message});
    };}

// méthode pour supprimer un contact par son id
exports.supprimerContact = async (req, res)=>{
    const {id} = req.params;
    try{
        const deletedRows = await modelContact.destroy({ where: { id } });
        if(deletedRows === 0){
            return res.status(404).json({message:"Contact non trouvé"});
        }
        res.status(200).json({message:"Contact supprimé"});
    }catch(error){
        res.status(400).json({message:error.message});
    };
}