import LocalSource from '@/datasource/controller';

async function getAllUsersFromLocalSource() {
    return LocalSource.getAllUsers();
}

async function getAllUsers() {
    let response;
    try{
        response = await getAllUsersFromLocalSource();
    }catch(err){
        response = {error: 1, status: 404, data: 'erreur rÃ©seau, impossible de rÃ©cupÃ©rer la liste des utilisateurs'  }
    }
    return response;
}

export default{
    getAllUsers,
}