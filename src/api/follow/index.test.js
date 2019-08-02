import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Follow } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, follow

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  follow = await Follow.create({ follower: user })
})

test('POST /follows 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, followed_type: 'test', followed: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.followed_type).toEqual('test')
  expect(body.followed).toEqual('test')
  expect(typeof body.follower).toEqual('object')
})

test('POST /follows 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /follows 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].follower).toEqual('object')
})

test('GET /follows 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /follows/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${follow.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(follow.id)
  expect(typeof body.follower).toEqual('object')
})

test('GET /follows/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${follow.id}`)
  expect(status).toBe(401)
})

test('GET /follows/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /follows/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${follow.id}`)
    .send({ access_token: userSession, followed_type: 'test', followed: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(follow.id)
  expect(body.followed_type).toEqual('test')
  expect(body.followed).toEqual('test')
  expect(typeof body.follower).toEqual('object')
})

test('PUT /follows/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${follow.id}`)
    .send({ access_token: anotherSession, followed_type: 'test', followed: 'test' })
  expect(status).toBe(401)
})

test('PUT /follows/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${follow.id}`)
  expect(status).toBe(401)
})

test('PUT /follows/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, followed_type: 'test', followed: 'test' })
  expect(status).toBe(404)
})

test('DELETE /follows/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${follow.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /follows/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${follow.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /follows/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${follow.id}`)
  expect(status).toBe(401)
})

test('DELETE /follows/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
