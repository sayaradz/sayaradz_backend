import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  list,
  read,
  create,
  update,
  destroy,
  addBrand,
  removeBrand
} from './controller'

import { ManufacturerSchema } from './model'

const router = new Router()
const { code, name } = ManufacturerSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post('/', body({ code, name }), create)

router.post('/:id/brands', addBrand)

router.delete('/:id/brands/:brand_id', removeBrand)

router.put('/:id', body({ code, name }), update)

router.delete('/:id', destroy)

export default router
