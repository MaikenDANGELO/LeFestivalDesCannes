const userService = require("../services/users.service");


exports.home = async (req, res) => {
    let session = req.session;

    if (session.id_user) {
        await userService.getUser(session.id_user, (error,data)=>{
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({data:data});
        })
    }else{
        return res.status(401).send("Utilisateur non connecté")
    }
}

exports.getUsers = async(req,res) => {
    await userService.getUsers((error,data)=>{
        if(error){
            return res.status(500).send("Erreur interne");
        }
        return res.status(200).json({data:data});
    })
}


exports.connexion = async(req, res) => {
    let {login,mdp} = req.body
    await userService.connexion(login, mdp,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        else if (data === "Aucun utilisateur ne correspond à ce login"){
            return res.status(404).send(data);
        }
        req.session.id_user = data.id;
        return res.status(200).json({data:data});
    })
}

exports.signup = async (req, res) =>{
    let {login, mdp, numero, username, adresse, signUp} = req.body
    await userService.signup(login, mdp, numero, username, adresse, signUp,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        req.session.id_user = data.id;
        return res.status(200).json({data:data});
    })
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
    const {id_prestataire, texte, note} = req.body
    const id_utilisateur = req.session.id_user
    await userService.sendAvis(id_prestataire, id_utilisateur, texte, note, (error,data)=>{
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
        return res.status(200).json({data:data});
    })
}

exports.getNotificationByUserID =  async (req, res) => {
    const id =  req.session.id_user
    await userService.getNotificationByUserID(id, (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    })
}

exports.changePersonnalData = async (req, res) => {
    const {nom, email, numero, adresse} = req.body
    const id =  req.session.id_user
    await userService.changePersonnalData(id, nom, email, numero, adresse,(error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    })
}

exports.changePassword = async (req, res) => {
    const newPassword = req.body.newPassword
    const id = req.session.id_user
    await userService.changePassword(id,newPassword,(error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({data: data});
    })
}