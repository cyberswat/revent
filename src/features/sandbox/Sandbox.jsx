import cuid from 'cuid'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { openModal } from '../../app/common/modals/modalReducer'
import TestMap from './testMap'
import TestPlaceInput from './TestPlaceInput'
import { increment, decrement } from './testReducer'

export default function Sandbox() {
  const dispatch = useDispatch()
  const [target, setTarget] = useState(null)
  const data = useSelector((state) => state.test.data)
  const { loading } = useSelector((state) => state.async)

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  }
  const [location, setLocation] = useState(defaultProps)

  function handleSetLocation(latLng) {
    setLocation({
      ...location,
      center: { lat: latLng.lat, lng: latLng.lng },
    })
  }
  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is:{data} </h3>
      <Button
        name='increment'
        loading={loading && target === 'increment'}
        onClick={(e) => {
          dispatch(increment(20))
          setTarget(e.target.name)
        }}
        content='Increment'
        color='green'
      />
      <Button
        name='decrement'
        loading={loading && target === 'decrement'}
        onClick={(e) => {
          dispatch(decrement(10))
          setTarget(e.target.name)
        }}
        content='Decrement'
        color='red'
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
        content='OpenModal'
        color='teal'
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput key={cuid()} setLocation={handleSetLocation} />
        <TestMap key={cuid()} location={location} />
      </div>
    </>
  )
}
