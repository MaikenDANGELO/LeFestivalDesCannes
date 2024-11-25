const userService = require("../services/users.service");


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
        return res.status(200).json({data:data});
    })
}

exports.signup = async (req, res) =>{
    let {login, mdp, numero, username, adresse, codePrest, signUp} = req.body
    await userService.signup(login, mdp, numero, username, adresse, codePrest, signUp,(error,data)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.status(200).json({data:data});
    })
}