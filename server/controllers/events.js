import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
    res.status(200).json(results.rows) // fix: rows not row
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getEventsByID = async (req, res) => {
  try {
    const selectQuery = 'SELECT * FROM events WHERE location_id=$1'
    const { location_id } = req.params // fix: destructure from req.params
    const results = await pool.query(selectQuery, [location_id])
    res.status(200).json(results.rows) // fix: rows not rows[0], we want all events
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getEvents,
  getEventsByID
}