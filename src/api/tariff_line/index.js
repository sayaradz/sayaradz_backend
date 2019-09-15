import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { list, read, create, update, destroy } from './controller'

import { TariffLineSchema } from './model'

const router = new Router()
const {
  tariff_target,
  tariff_type,
  d_from,
  d_to,
  quantity,
  price
} = TariffLineSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post(
  '/',
  body({ tariff_target, tariff_type, d_from, d_to, quantity, price }),
  create
)

router.put('/:id', update)

router.delete('/:id', destroy)

export default router
