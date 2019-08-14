import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { list, read, create, update, destroy } from './controller'

import { OrderSchema } from './model'

const router = new Router()
const { version, color, options, user, order_date, amount } = OrderSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post(
  '/',
  body({ version, color, options, user, order_date, amount }),
  create
)

router.put(
  '/:id',
  body({ version, color, options, user, order_date, amount }),
  update
)

router.delete('/:id', destroy)

export default router
