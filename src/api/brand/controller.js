import { success, notFound } from '../../services/response/'
import Brand from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Brand.count(query)
    .then(count =>
      Brand.find(query, select, cursor).then(brands => ({
        rows: brands,
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Brand.findById(params.id)
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Brand.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? Object.assign(user, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? user.remove() : null))
    .then(success(res, 204))
    .catch(next)
