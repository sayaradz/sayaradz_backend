import { Router } from 'express'
import { signin } from './controller'
import Passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

import {
  password,
  master,
  google,
  token,
  local,
  passport
} from '../../services/passport'

const router = new Router()

router.post('/signin', local(), signin)
//router.post('/', master(), password(), login)
//router.post('/google', google(), login)

export default router
