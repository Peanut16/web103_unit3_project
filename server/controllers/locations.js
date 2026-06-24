import { pool } from '../config/database.js'

const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM Locations ORDER BY name ASC')
        res.status(200).json(results.row)
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}

export default {
    getLocations
}