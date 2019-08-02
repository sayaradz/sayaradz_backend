import { success, notFound } from '../../services/response/'
import User from './model'
import Follow from '../follow/model'
import Notif from '../notification/model'
import { sign } from '../../services/jwt'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count =>
      User.find(query, select, cursor).then(users => ({
        rows: users.map(user => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const followed = followed_type => (
  { querymen: { query, select, cursor }, params: { id: userId } },
  res,
  next
) => {
  Follow.count(query)
    .then(count =>
      Follow.find({ follower: userId, followed_type }, select, cursor).then(
        follows => ({
          rows: follows.map(user => user.view()),
          count: follows.length
        })
      )
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? user.view() : null))
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) => res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) => {
  User.create(body)
    .then(user => {
      sign(user.id)
        .then(token => ({ token, user }))
        .then(success(res, 201))
    })
    .catch(err => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })
}

export const follow = followed_type => (req, res, next) => {
  Follow.create({
    follower: req.params.id,
    followed_type,
    followed: req.body.followed
  })
    .then(follow => {
      res.json(follow)
    })
    .catch(err => {
      res.json({
        error: true,
        message: `User has already followed this ${followed_type}`
      })
    })
}

export const unfollow = followed_type => (req, res, next) => {
  Follow.findOneAndRemove({
    follower: req.params.id,
    followed_type,
    followed: req.params.followed
  })
    .then(follow => {
      res.status(204).send()
    })
    .catch(err => {
      res.json({
        error: true,
        message: `User has already unfollowed this ${followed_type}`
      })
    })
}

export const isFollowing = followed_type => async (req, res, next) => {
  const follow = await Follow.findOne({
    follower: req.params.id,
    followed: req.params.followed,
    followed_type
  })
  res.json({
    following: follow ? true : false
  })
}

export const notifications = (
  { querymen: { query, select, cursor }, params: { id } },
  res,
  next
) =>
  Notif.count(query)
    .then(count =>
      Notif.find({ concern_user: id }, select, cursor).then(notifications => ({
        count: notifications.length,
        rows: notifications.map(notification => notification.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const addManufacturer = (req, res, next) => {
  const { manufacturer_id } = req.body
  const { id } = req.params
  User.findByIdAndUpdate(
    id,
    {
      $push: { manufacturers_access: manufacturer_id }
    },
    { new: true }
  )
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })
}

export const removeManufacturer = ({ params }, res, next) =>
  User.findByIdAndUpdate(params.id, {
    $pull: { manufacturers_access: params.manufacturer_id }
  })
    .then(success(res, 204))
    .catch(next)

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(result => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: "You can't change other user's data"
        })
        return null
      }
      return result
    })
    .then(user => (user ? Object.assign(user, body).save() : null))
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)

export const updatePassword = (
  { bodymen: { body }, params, user },
  res,
  next
) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then(result => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: "You can't change other user's password"
        })
        return null
      }
      return result
    })
    .then(user => (user ? user.set({ password: body.password }).save() : null))
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? user.remove() : null))
    .then(success(res, 204))
    .catch(next)
