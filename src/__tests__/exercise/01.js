// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  // arrange
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)

  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  // assert
  expect(message.textContent).toBe('Current count: 0')

  // act, using click()
  increment.click()

  // assert
  expect(message.textContent).toBe('Current count: 1')

  // act, using dispatchEvent
  decrement.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  }))

  // assert
  expect(message.textContent).toBe('Current count: 0')
  
  // act

  // cleanup
  div.remove()
})

/* eslint no-unused-vars:0 */
