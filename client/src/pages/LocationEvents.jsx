import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { id } = useParams()
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getEventsByLocationId(id)
                setEvents(eventsData)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [id])

    return (
        <div className='location-events'>
            <main>
                {
                    events && events.length > 0
                        ? events.map((event) =>
                            <Event
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                            />
                        )
                        : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
