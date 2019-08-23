import Passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import * as googleService from '../google'
import User, { schema } from '../../api/user/model'

Passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ email, password }).lean()
        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password' })
        }
        return cb(null, user, { message: 'Logged in successfully' })
      } catch (err) {
        cb(err)
      }
    }
  )
)

Passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (jwtPayload, cb) => {
      try {
        const user = await User.findById(jwtPayload.id)
        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )
)
export const local = () => (req, res, next) => {
  Passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        customer: user
      })
    }
    req.login(user, { session: false }, err => {
      if (err) {
        return res.status(401).end()
      }
      next()
    })
  })(req, res, next)
}
export const token = ({
  required,
  roles = ['user', 'manufacturer', 'admin']
} = {}) => (req, res, next) =>
  Passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (
      err ||
      (required && !user) ||
      (required && !~roles.indexOf(user.role))
    ) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, err => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)
/*export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, err => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)*/

/*
export const google = () => passport.authenticate('google', { session: false })

export const master = () => passport.authenticate('master', { session: false })

export const token = ({ required, roles = User.roles } = {}) => (
  req,
  res,
  next
) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (
      err ||
      (required && !user) ||
      (required && !~roles.indexOf(user.role))
    ) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, err => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

export const local = () => (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err)
      }
      return res.redirect('/users/' + user.username)
    })
  })(req, res, next)
}*/
/*passport.use(
  new LocalStrategy({function(email, password, done) {
    console.log('tttt')
    User.findOne({ email }, function(err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  })
)*/
/*passport.use(
  'password',
  new BasicStrategy((email, password, done) => {
    console.log('ttttt')
    const userSchema = new Schema({
      email: schema.tree.email,
      password: schema.tree.password
    })
    userSchema.validate({ email, password }, err => {
      if (err) done(err)
    })
    User.findOne({ email }).then(user => {
      if (!user) {
        done(true)
        return null
      }
      return user
        .authenticate(password, user.password)
        .then(user => {
          done(null, user)
          return null
        })
        .catch(done)
    })
  })
)

passport.use(
  'google',
  new BearerStrategy((token, done) => {
    googleService
      .getUser(token)
      .then(user => {
        return User.createFromService(user)
      })
      .then(user => {
        done(null, user)
        return null
      })
      .catch(done)
  })
)

passport.use(
  'master',
  new BearerStrategy((token, done) => {
    if (token === masterKey) {
      done(null, {})
    } else {
      done(null, false)
    }
  })
)

passport.use(
  'token',
  new JwtStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token'),
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
      ])
    },
    ({ id }, done) => {
      User.findById(id)
        .then(user => {
          done(null, user)
          return null
        })
        .catch(done)
    }
  )
)
*/
