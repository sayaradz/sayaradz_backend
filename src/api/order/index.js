import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  list,
  read,
  create,
  update,
  destroy,
  trendingVersions
} from './controller'

import { OrderSchema } from './model'

const router = new Router()
const {
  version,
  color,
  options,
  user,
  order_date,
  order_status,
  amount
} = OrderSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.get('/trending/versions', trendingVersions)

router.post(
  '/',
  body({ version, color, options, user, order_date, order_status, amount }),
  create
)

router.put('/:id', update)

router.delete('/:id', destroy)

export default router
