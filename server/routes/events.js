import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/:location_id', EventsController.getEventsByID)

export default router