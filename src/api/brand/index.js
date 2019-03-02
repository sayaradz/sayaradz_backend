import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { list, read, create, update, destroy } from './controller'

import { BrandSchema } from './model'

const router = new Router()
const { code, name, logo } = BrandSchema.tree

router.get('/', query(), list)

router.get('/:id', read)

router.post('/', body({ code, name, logo }), create)

router.put('/:id', body({ code, name, logo }), update)

router.delete('/:id', destroy)

export default router
