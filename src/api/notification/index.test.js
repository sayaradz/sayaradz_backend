import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Notification } from '.'

const app = () => express(apiRoot, routes)

let notification

beforeEach(async () => {
  notification = await Notification.create({})
})

test('POST /notifications 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ message: 'test', seen: 'test', concern_user: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.message).toEqual('test')
  expect(body.seen).toEqual('test')
  expect(body.concern_user).toEqual('test')
})

test('GET /notifications 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /notifications/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${notification.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notification.id)
})

test('GET /notifications/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /notifications/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${notification.id}`)
    .send({ message: 'test', seen: 'test', concern_user: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notification.id)
  expect(body.message).toEqual('test')
  expect(body.seen).toEqual('test')
  expect(body.concern_user).toEqual('test')
})

test('PUT /notifications/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ message: 'test', seen: 'test', concern_user: 'test' })
  expect(status).toBe(404)
})

test('DELETE /notifications/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notification.id}`)
  expect(status).toBe(204)
})

test('DELETE /notifications/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
