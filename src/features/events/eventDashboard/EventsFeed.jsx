import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Feed, Header, Segment } from 'semantic-ui-react'
import { firebaseObjectToArray, getUserFeedRef } from '../../../app/firestore/firebaseService';
import { listenToFeed } from '../../profiles/profileActions';
import { useEffect } from 'react';
import EventFeedItem from './EventFeedItem';

export default function EventsFeed() {
    const dispatch = useDispatch();
    const { feed } = useSelector((state) => state.profile);

    useEffect(() => {
        getUserFeedRef().on('value', snapshot => {
            if (!snapshot.exists()) {
                return;
            }
            const feed = firebaseObjectToArray(snapshot.val()).reverse();
            dispatch(listenToFeed(feed))
        })
        return () => {
            getUserFeedRef().off()
        }
    }, [dispatch])

    return (
        <>
            <Header attached color='teal' icon='newspaper' content='News Feed' />
            <Segment attached='bottom'>
                <Feed>
                    {!feed.length &&
                        <div>no feed items</div>
                    }
                    {feed.map(post => (
                        <EventFeedItem post={post} key={post.id} />
                    ))}
                </Feed>
            </Segment>
        </>
    )
}
