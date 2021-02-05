import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import AboutTab from './AboutTab'
import EventsTab from './EventsTab'
import PhotosTab from './PhotosTab'

export default function ProfileContent({ profile, isCurrentUser }) {
  const [activeTab, setActiveTab] = useState(0)
  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser}>
          About
        </AboutTab>
      ),
    },
    {
      menuItem: 'Photos',
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { menuItem: 'Events', render: () => <EventsTab /> },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> },
  ]
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  )
}
