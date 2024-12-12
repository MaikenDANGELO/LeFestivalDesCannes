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
        req.session.id_user = data.id;
        console.log(req.session);
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
        console.log(req.session);
        return res.status(200).json({data:data});
    })
}

exports.deleteAvis = async (req, res) =>{
    const {id} = req.body
    await userService.deleteAvis(id, (error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}

exports.sendAvis = async (req, res) =>{
    const {id_prestataire, id_utilisateur, texte, note} = req.body
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
