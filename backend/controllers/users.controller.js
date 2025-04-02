const userService = require("../services/users.service");


exports.home = async (req, res) => {
    res.status(200).json({error: 0, data: req.user});
}

exports.getUsers = async(req,res) => {
    await userService.getUsers((error,data)=>{
        if(error){
            return res.status(500).send("Erreur interne");
        }
        return res.status(200).json({error:0, data:data});
    })
}


exports.connexion = async(req, res) => {
    if (req.user) res.status(200).json({error: 0, data: req.user});
    else res.status(400).json({error: 1, data: "Erreur lors de la connexion"});

}

exports.signup = async (req, res) =>{
    if (req.user) res.status(200).json({error: 0, data: req.user});
    else res.status(400).json({error: 1, data: "Erreur lors de l'inscription"});

}

exports.logout = (req,res)=>{
    req.session.destroy((err)=>{
        if(!err){
            res.status(200).json({error:0, data: "Déconnexion réussie"});
        }
        else {
            res.status(400).json({error:1, data:"Erreur de déconnexion"});
        }
    });
}

exports.deleteAvis = async (req, res) =>{
    const id = req.body.id
    await userService.deleteAvis(id, (error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}

exports.sendAvis = async (req, res) =>{
    const [id_prestataire, note,texte, id_user] = req.body
    await userService.sendAvis(id_prestataire, id_user, texte, note, (error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}

exports.modifyAvis = async (req, res) =>{
    const {texte, note, id} = req.body
    await userService.modifyAvis(texte, note, id,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({error: 0, data:data});
    })
}

exports.getNotificationByUserID =  async (req, res) => {
    const id =  req.params.id
    await userService.getNotificationByUserID(id, (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    })
}

exports.changePersonnalData = async (req, res) => {
    const {nom, email, adresse, numero, id} = req.body
    await userService.changePersonnalData(id, nom, email, numero, adresse,(error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({error: 0, data: data});
    })
}

exports.changePassword = async (req, res) => {
    const newPassword = req.body.newPassword
    const id = req.body.id
    await userService.changePassword(id,newPassword,(error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({error: 0, data: data});
    })
}