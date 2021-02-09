import React from 'react'
import { Card, Grid, Header, Tab } from 'semantic-ui-react'
import ProfileCard from './ProfileCard'

export default function FollowingTab({ profile }) {
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`Followers`} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            <ProfileCard profile={profile} key={profile.id} />
            <ProfileCard profile={profile} key={profile.id} />
            <ProfileCard profile={profile} key={profile.id} />
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
