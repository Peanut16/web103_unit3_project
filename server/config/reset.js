import { pool } from "./database.js";
import eventsData from "../data/events.js"
import locationData from "../data/locations.js";

const createLocationsTable = async () => {
    const createLocationsTableQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    );
    `
    try {
        const res = await pool.query(createLocationsTableQuery)
        console.log('🎉 locations table created successfully')
    } catch (err) {
        console.error('⚠️ error creating locations table', err)
    }
}

const createEventsTable = async () => {
    const createEventsTableQuery = `
    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      time TEXT,
      location_id INTEGER
    );`

    try {
        const res = await pool.query(createEventsTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedLocationTable = async () => {
    await createLocationsTable()

    locationData.forEach((location) => {
        const insertQuery = {
            text: "INSERT INTO locations (name, description) VALUES ($1, $2)"
        }

        const values = [
            location.name,
            location.description
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err)
                return
            }
            console.log(`✅ ${location.name} added successfully`)
        })
    })
}

const seedEventsTable = async () => {
    await createEventsTable()

    eventsData.forEach((event) => {
        const insertQuery = {
            text: "INSERT INTO events (title, description, date, time, location_id) VALUES ($1, $2, $3, $4, $5)"
        }

        const values = [
            event.title,
            event.description,
            event.date,
            event.time,
            event.location_id
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }
            console.log(`✅ ${event.title} added successfully`)
        })
    });
}

const run = async () => {
    await seedLocationTable()
    await seedEventsTable()
}

run()
