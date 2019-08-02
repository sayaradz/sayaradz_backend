import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Follow } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Follow.create({ ...body, follower: user })
    .then((follow) => follow.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Follow.count(query)
    .then(count => Follow.find(query, select, cursor)
      .populate('follower')
      .then((follows) => ({
        count,
        rows: follows.map((follow) => follow.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Follow.findById(params.id)
    .populate('follower')
    .then(notFound(res))
    .then((follow) => follow ? follow.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Follow.findById(params.id)
    .populate('follower')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'follower'))
    .then((follow) => follow ? Object.assign(follow, body).save() : null)
    .then((follow) => follow ? follow.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Follow.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'follower'))
    .then((follow) => follow ? follow.remove() : null)
    .then(success(res, 204))
    .catch(next)
