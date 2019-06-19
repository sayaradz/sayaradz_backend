import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  list,
  read,
  create,
  update,
  destroy,
  addOption,
  addColor,
  removeOption,
  removeColor
} from './controller'

import { VersionSchema } from './model'

const router = new Router()
const { code, name, image_url } = VersionSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post('/', body({ code, name, image_url }), create)

router.post('/:id/options', addOption)

router.post('/:id/colors', addColor)

router.delete('/:id/options/:option_id', removeOption)

router.delete('/:id/colors/:color_id', removeColor)

router.put('/:id', body({ code, name, image_url }), update)

router.delete('/:id', destroy)

export default router
