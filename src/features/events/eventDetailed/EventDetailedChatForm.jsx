import React from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { addEventChatComment } from '../../../app/firestore/firebaseService'
import MyTextArea from '../../../app/common/form/MyTextArea'
import { Button } from 'semantic-ui-react'

export default function EventDetailedChatForm({ eventId }) {
  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, values.comment)
          resetForm()
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='ui form'>
          <MyTextArea
            name='comment'
            placeholder='Please enter your comment'
            rows={2}
          />
          <Button
            loading={isSubmitting}
            content='Add Reply'
            icon='edit'
            primary
            type='submit'
          />
        </Form>
      )}
    </Formik>
  )
}
