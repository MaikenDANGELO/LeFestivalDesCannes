const Association = require('../database/models/Association');


exports.getAllAssociations = async (callback) => {
    try{
        const associations = await Association.findAll();
        if (!associations) {
            return callback("Aucune association trouvée", null);
        }
        return callback(null, associations);
    }catch (error){
        return callback(error, null);
    }
}