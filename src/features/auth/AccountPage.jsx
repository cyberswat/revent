import { Formik } from 'formik'
import React from 'react'
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'
import MyTextInput from '../../app/common/form/MyTextInput'

export default function AccountPage() {
  return (
    <Segment>
      <Header dividing size='large' content='Account' />
      <div>
        <Header color='teal' sub content='Change Password' />
        <p>Use this form to change your password.</p>
        <Formik
          initialValues={{ newPassword1: '', newPassword2: '' }}
          validationSchema={Yup.object({
            newPassword1: Yup.string().required('Password is required.'),
            newPassword2: Yup.string().oneOf(
              [Yup.ref('newPassword1'), null],
              'Passwords do not match'
            ),
          })}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ errors, isSubmitting, isValid, dirty }) => (
            <Form className='ui form'>
              <MyTextInput
                name='newPassword1'
                type='password'
                placeholder='New Password'
              />
              <MyTextInput
                name='newPassword2'
                type='password'
                placeholder='Confirm Password'
              />
              {errors.auth && (
                <Label
                  basic
                  color='red'
                  style={{ marginBottom: 10 }}
                  content={errors.auth}
                />
              )}
              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type='submit'
                fluid
                size='large'
                color='teal'
                content='Update Password'
              />
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Header color='teal' sub content='Google account' />
        <p>Please visit Google to update your account</p>
        <Button
          icon='google'
          color='google plus'
          href='https://google.com'
          content='Go to Google'
        />
      </div>
    </Segment>
  )
}
