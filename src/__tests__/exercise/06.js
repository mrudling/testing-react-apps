// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

window.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
}

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: '12.34',
      longitude: '56.78',
    },
  }

  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)
  
  // const {promise, resolve, reject} = deferred()
  // window.navigator.geolocation.getCurrentPosition = jest
  //   .fn()
  //   .mockImplementation(success => {
  //     promise.then(() => success(fakePosition))
  //   })
  
  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  
  act(() => {
    setReturnValue([fakePosition])
  })
  
  expect(screen.getByText(/latitude/i)).toBeInTheDocument()
  expect(screen.getByText(/longitude/i)).toBeInTheDocument()
})

/*
eslint
  no-unused-vars: "off",
*/
