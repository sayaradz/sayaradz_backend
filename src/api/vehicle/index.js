import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { list, read, create, update, destroy } from './controller'

import { VehicleSchema } from './model'

const router = new Router()
const { model, version, chassis_number } = VehicleSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post('/', body({ model, version, chassis_number }), create)

router.put('/:id', body({ model, version, chassis_number }), update)

router.delete('/:id', destroy)

export default router
