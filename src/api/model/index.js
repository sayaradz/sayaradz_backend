import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  list,
  read,
  create,
  update,
  destroy,
  addVersion,
  removeVersion
} from './controller'

import { ModelSchema } from './model'

const router = new Router()
const { code, name, image_url } = ModelSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post('/', body({ code, name, image_url }), create)

router.post('/:id/versions', addVersion)

router.delete('/:id/versions/:version_id', removeVersion)

router.put('/:id', body({ code, name }), update)

router.delete('/:id', destroy)

export default router
