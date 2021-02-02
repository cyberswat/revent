import { React } from 'react'
import { Button } from 'semantic-ui-react'
export default function SocialLogin() {
  return (
    <>
      <Button
        icon='google'
        type='submit'
        fluid
        color='google plus'
        style={{ marginBottom: 10 }}
        content='Login with Google'
      />
    </>
  )
}
