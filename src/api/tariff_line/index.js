import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { list, read, create, update, destroy } from './controller'

import { TariffLineSchema } from './model'

const router = new Router()
const {
  tariff_type,
  tariff_type_model,
  d_from,
  d_to,
  price
} = TariffLineSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post(
  '/',
  body({ tariff_type, tariff_type_model, d_from, d_to, price }),
  create
)

router.put(
  '/:id',
  body({ tariff_type, tariff_type_model, d_from, d_to, price }),
  update
)

router.delete('/:id', destroy)

export default router
