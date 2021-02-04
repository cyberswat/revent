import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailedSidebar from './EventDetaildSidebar'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import { useSelector, useDispatch } from 'react-redux'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService'
import { listenToEvents } from '../eventActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Redirect } from 'react-router-dom'

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch()
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  )
  const { currentUser } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.async)
  const isHost = event?.hostUid === currentUser?.uid
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid)

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  })

  if (loading || (!event && !error))
    return <LoadingComponent content='Loading event...' />

  if (error) return <Redirect to='/error' />

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  )
}
