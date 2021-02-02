import { React } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { closeModal } from '../../app/common/modals/modalReducer'
import { socialLogin } from '../../app/firestore/firebaseService'

export default function SocialLogin() {
  const dispatch = useDispatch()

  function handleSocialLogin(provider) {
    dispatch(closeModal())
    socialLogin(provider)
  }
  return (
    <>
      <Button
        icon='google'
        onClick={() => handleSocialLogin('google.com')}
        fluid
        color='google plus'
        style={{ marginBottom: 10 }}
        content='Login with Google'
      />
    </>
  )
}
