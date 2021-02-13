import React from 'react'
import { Route, useLocation } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import EventForm from '../../features/events/eventDashboard/EventForm'
import NavBar from '../../features/nav/NavBar'
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage'
import HomePage from '../../features/home/HomePage'
import Sandbox from '../../features/sandbox/Sandbox'
import ModalManager from '../common/modals/ModalManager'
import { ToastContainer } from 'react-toastify'
import ErrorComponent from '../common/errors/ErrorComponent'
import AccountPage from '../../features/auth/AccountPage'
import { useSelector } from 'react-redux'
import LoadingComponent from './LoadingComponent'
import ProfilePage from '../../features/profiles/profilePage/ProfilePage'

function App() {
  const { key } = useLocation()
  const { initialized } = useSelector((state) => state.async)

  if (!initialized) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/sandbox' component={Sandbox} />
              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route path='/error' component={ErrorComponent} />
              <Route path='/profile/:id' component={ProfilePage} />
              <Route path='/account' component={AccountPage} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default App
