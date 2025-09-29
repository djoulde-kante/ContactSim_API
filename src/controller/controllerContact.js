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
        res.status(201).json(contact);
    }catch(error){
        res.status(400).json({message:error.message});
    };}

    // méthode pour récuperer tous les contacts
    exports.listerContacts = async (req, res)=>{
        try{
            const contacts = await modelContact.find();
            res.status(200).json(contacts);
        }catch(error){
            res.status(400).json({message:error.message});
        };}

// méthode pour modifier un contact
exports.modifierContact = async (req, res)=>{
    const {id} = req.params;
    const {nom,telephone} = req.body;
    try{
        const contact = await modelContact.findByIdAndUpdate(id, {nom,telephone}, {new:true});
        //res.status(200).json(contact);
        if(!contact){
            return res.status(404).json({message:"Contact non trouvé"});
        }
        res.status(200).json({message:"Contact modifié avec succès"});    
        
    }catch(error){
        res.status(400).json({message:error.message});
    };}

// méthode pour supprimer un contact par son id
exports.supprimerContact = async (req, res)=>{
    const {id} = req.params;
    try{
        const contact = await modelContact.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json({message:"Contact non trouvé"});
        }
        res.status(200).json({message:"Contact supprimé"});
    }catch(error){
        res.status(400).json({message:error.message});
    };}       
