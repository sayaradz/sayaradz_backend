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

router.get('/', query(), list)

router.get('/:id', read)

router.get('/trending/versions', trendingVersions)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', destroy)

export default router
