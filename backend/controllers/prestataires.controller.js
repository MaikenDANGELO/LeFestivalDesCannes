// Description: Contient la logique de routing pour les prestataires.

const prestataireService = require("../services/prestataires.service");


exports.getAvis = async (req, res) =>{
    const { id } = req.params;
    await prestataireService.getAvis(id,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        if (data.length === 0){
            return res.status(404).json({ message: "Avis non trouvés pour le prestataire avec l'ID " + id });
        }
        return res.status(200).json({data:data});
    })
}

exports.getAllAvis = async (req, res) =>{
    await prestataireService.getAllAvis((error,data)=>{
        if(error) {
            return res.status(500).send(error);
        }
        if(data.length === 0){
            return res.status(404).json({ message: "Aucun avis trouvé" });
        }
        return res.status(200).json({data:data})
    })
}

exports.getAllPrestataire = async (req, res) =>{
    await prestataireService.getAllPrestataire((error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}

exports.sendFormPrestataire = async (req, res) =>{
    const id_utilisateur = req.session.id_user
    const form = req.body
    console.log(form)
    await prestataireService.sendFormPrestataire(form, id_utilisateur,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}

exports.getTotalDonsOf = async (req, res) =>{
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "L'ID du prestataire est requis" });
    }
    await prestataireService.getTotalDonsOf(id,(error,data)=> {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    })
}

exports.makeDonation = async (req, res) =>{
    const userId = req.session.id_user;
    const prestaId = req.params.prestId;
    const { amount, message } = req.body;
    if (!amount) {
        return res.status(400).json({ message: "Le montant du don est requis" });
    }
    await prestataireService.makeDonation(userId, prestaId, amount, message,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}

exports.getAllBalades = async (req, res) =>{
    await prestataireService.getAllBalades((error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}

exports.getbaladesfromUid = async (req, res) =>{
    const user_id = req.session.id_user;
    await prestataireService.getbaladesfromUid(user_id,(error,data)=> {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    });
}

exports.reservebalade = async (req, res) =>{
    const balade_id = req.params.balade_id;
    const user_id = req.session.id_user;
    await prestataireService.reservebalade(balade_id, user_id,(error,data)=>{
        if (error === "Balade introuvable") { return res.status(404).send(error); }
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}


exports.cancelbalade = async (req, res) =>{
    const balade_id = req.params.balade_id;
    const user_id = req.session.id_user;
    await prestataireService.cancelbalade(balade_id, user_id,(error,data)=>{
        if (error === "Balade introuvable") { return res.status(404).send(error); }
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}