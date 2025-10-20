import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDTO } from './dto/LoginDTO'

const BASE_URL = 'https://backend.tallinn-learning.ee'

test('Login/student returns 200 and valid JWT', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/login/student`, {
    data: LoginDTO.createLoginWithCorrectData(),
  })

  expect(response.status()).toBe(StatusCodes.OK)

  const jwtValue = await response.text()
  const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  expect(jwtValue).toMatch(jwtRegex)
})

test( 'Login/student returns 401 if credentials are invalid', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/login/student`, {
    data: LoginDTO.createLoginWithBrokenData(),
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Login/student returns 401 if password is missing', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/login/student`, {
    data: { username: 'test' },
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Login/student returns 401 if request body is empty', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/login/student`, { data: {} })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Login/student returns 400 if request body is missing', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/login/student`)
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Login/student returns 405 if method is GET', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/login/student`)
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('Login/student returns 400 if request body has invalid types', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/login/student`, {
    data: { username: 123, password: true },
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})