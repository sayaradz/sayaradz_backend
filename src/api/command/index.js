import { Router } from 'express'
import { middleware as query } from 'querymen'
import Passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

import { estimatePrice } from './controller'

import { token, local } from '../../services/passport'

const router = new Router()
router.get('/estimatePrice', estimatePrice)

export default router
