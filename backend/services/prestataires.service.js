const pool = require("../database/db");


const getAvis = async (id, callback)=>{
    const client = await pool.connect();
    try {
        const SQL = `
            SELECT *
            FROM avis 
            WHERE id_prestataire = $1`
        const res = await client.query(SQL, [id])

        callback(null, res.rows)

    }catch (error){
        callback(error, null)
    }finally {
        client.release();
    }
}

module.exports = {
    getAvis,
}