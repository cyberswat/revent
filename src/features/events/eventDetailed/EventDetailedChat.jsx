import { formatDistance } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment, Comment, Header } from 'semantic-ui-react'
import { getEventChatRef } from '../../../app/firestore/firebaseService'
import { CLEAR_COMMENTS } from '../eventConstants'
import EventDetailedChatForm from './EventDetailedChatForm'

export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch()
  const { comments } = useSelector((state) => state.event)
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  })

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null })
  }

  useEffect(() => {
    getEventChatRef(eventId).on('value', (snapshot) => {
      if (!snapshot.exists()) return
      console.log(snapshot.val().reverse())
    })
    return () => {
      dispatch({ type: CLEAR_COMMENTS })
      getEventChatRef().off()
    }
  }, [eventId, dispatch])

  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} />{' '}
        <Comment.Group>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>{' '}
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split('\n').map((text, i) => (
                    <span key={i}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setShowReplyForm({ open: true, commentId: comment.id })
                    }
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm.open &&
                    showReplyForm.commentId === comment.id && (
                      <EventDetailedChatForm
                        eventId={eventId}
                        parentId={comment.id}
                        closeForm={handleCloseReplyForm}
                      />
                    )}{' '}
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  )
}
