const userPrestataire = require("../services/prestataires.service");


exports.getAvis = async (req, res) =>{
    const { id } = req.params;
    await userPrestataire.getAvis(id,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        if (data.length === 0){
            return res.status(404).json({ message: "Avis non trouvés pour le prestataire avec l'ID " + id });
        }
        return res.status(200).json({data:data});
    })
}