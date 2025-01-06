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
