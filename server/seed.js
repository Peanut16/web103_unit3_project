import { pool } from './config/database.js'
import locationData from './data/locations.js'
import eventData from './data/events.js'

const seed = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        time VARCHAR(50),
        location_id INTEGER REFERENCES locations(id)
      )
    `)

    await pool.query('TRUNCATE TABLE events, locations RESTART IDENTITY CASCADE')

    for (const location of locationData) {
      await pool.query(
        'INSERT INTO locations (name, description) VALUES ($1, $2)',
        [location.name, location.description]
      )
    }

    for (const event of eventData) {
      await pool.query(
        'INSERT INTO events (title, description, date, time, location_id) VALUES ($1, $2, $3, $4, $5)',
        [event.title, event.description, event.date, event.time, event.location_id]
      )
    }

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await pool.end()
  }
}

seed()
