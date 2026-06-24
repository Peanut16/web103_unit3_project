const getEventsByLocationId = async (location_id) => {
    const response = await fetch(`/api/events/${location_id}`)
    const data = await response.json()
    return data
}

export default { getEventsByLocationId }
