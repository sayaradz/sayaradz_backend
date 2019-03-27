import { Router } from 'express'
import { signin, checkToken } from './controller'
import Passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

import { token, local } from '../../services/passport'

const router = new Router()

router.post('/signin', local(), signin)
router.get('/checkToken', token({ required: true }), checkToken)
//router.post('/', master(), password(), login)
//router.post('/google', google(), login)
//
export default router
