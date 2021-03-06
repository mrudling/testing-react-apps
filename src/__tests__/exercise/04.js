// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
const {build, fake} = require('@jackfranklin/test-data-bot')

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn().mockImplementation(() => {})
  const userBuilder = build('User', {
    fields: {
      username: fake(faker => faker.internet.userName()),
      password: fake(faker => faker.internet.password()),
    },
  })

  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = userBuilder()

  userEvent.type(screen.getByText('Username'), username)
  userEvent.type(screen.getByText('Password'), password)

  userEvent.click(screen.getByText('Submit'))

  expect(handleSubmit).toHaveBeenCalledWith({
    password: expect.any(String),
    username: expect.any(String),
  })
})

/*
eslint
  no-unused-vars: "off",
*/
