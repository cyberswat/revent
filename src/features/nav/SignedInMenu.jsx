import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { signOutFirebase } from '../../app/firestore/firebaseService'

export default function SignedInMenu() {
  const history = useHistory()
  const { currentUser } = useSelector((state) => state.auth)
  async function handleSignOut() {
    try {
      await signOutFirebase()
      history.push('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUser.photoURL || '/assets/user.png'}
      ></Image>
      <Dropdown pointing='top left' text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item text='My profile' icon='user' />
          <Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
