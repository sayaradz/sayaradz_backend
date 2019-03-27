import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { list, read, create, update, destroy } from './controller'

import { OptionSchema } from './model'

const router = new Router()
const { code, name } = OptionSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post('/', body({ code, name }), create)

router.put('/:id', body({ code, name }), update)

router.delete('/:id', destroy)

export default router
