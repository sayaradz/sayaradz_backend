import { Router } from 'express'
import { middleware as query } from 'querymen'
import Passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

import {
  estimatePrice,
  getAvailableInModels,
  getAvailableInVersions,
  getAvailableInOptions,
  getAvailableInColors
} from './controller'

import { token, local } from '../../services/passport'

const router = new Router()

router.get('/estimatePrice', estimatePrice)
router.get('/brands/:id/models/availables', getAvailableInModels)
router.get('/models/:id/versions/availables', getAvailableInVersions)
router.get('/versions/:id/options/availables', getAvailableInOptions)
router.get('/versions/:id/colors/availables', getAvailableInColors)

export default router
