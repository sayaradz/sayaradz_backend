import { ip, port } from '../../config'
import Axios from 'axios'

const BACKEND_URL = `http://${ip}:${port}`

let manufacturer1, manufacturer2

test('POST /manufacturers 201', async () => {
  const { status, data } = await Axios.post(`${BACKEND_URL}/manufacturers`, {
    name: 'Manufacturer1'
  })
  manufacturer1 = data
  expect(status).toBe(201)
  expect(typeof data).toBe('object')
  expect(typeof data.name).toBe('string')
  expect(data.name).toBe('Manufacturer1')
})

test('POST /manufacturers 201', async () => {
  const { status, data } = await Axios.post(`${BACKEND_URL}/manufacturers`, {
    name: 'Manufacturere2'
  })
  manufacturer2 = data
  expect(status).toBe(201)
  expect(typeof data).toBe('object')
  expect(typeof data.name).toBe('string')
})

test('GET /manufacturers 200', async () => {
  const { status, data } = await Axios.get(`${BACKEND_URL}/manufacturers`)
  expect(status).toBe(200)
  expect(data).not.toBeNull()
  expect(Array.isArray(data.rows)).toBe(true)
  expect(Number.isNaN(data.count)).toBe(false)
})

test('GET /manufacturers?page=2&limit=1 200', async () => {
  const { status, data } = await Axios.get(
    `${BACKEND_URL}/manufacturers?page=2&limit=1`
  )
  expect(status).toBe(200)
  expect(Array.isArray(data.rows)).toBe(true)
  expect(Number.isNaN(data.count)).toBe(false)
  expect(data.rows.length).toBe(1)
})

test('PUT /manufacturers/:id 200', async () => {
  const { status, data } = await Axios.put(
    `${BACKEND_URL}/manufacturers/${manufacturer1._id}`,
    {
      name: 'Manufacturere1_Edited'
    }
  )
  expect(status).toBe(200)
  expect(typeof data).toBe('object')
  expect(data.name).toBe('Manufacturere1_Edited')
  manufacturer1 = data
})

/*
test('DELETE /manufacturers/:id 204 (admin)', async () => {
  const { status } = await Axios.delete(
    `${BACKEND_URL}/manufacturers/${manufacturer1._id}`
  )
  expect(status).toBe(204)
})

test('DELETE /manufacturers/:id 204 (admin)', async () => {
  const { status } = await Axios.delete(
    `${BACKEND_URL}/manufacturers/${manufacturer2._id}`
  )
  expect(status).toBe(204)
})
*/
