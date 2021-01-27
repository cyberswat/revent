import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailedSidebar from './EventDetaildSidebar'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import { useSelector } from 'react-redux'

export default function EventDetailedPage({ match }) {
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  )
}
