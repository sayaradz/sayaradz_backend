import { success, notFound } from '../../services/response/'
import Model from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Model.count(query)
    .then(count =>
      Model.find(query, select, cursor)
        .populate('options')
        .populate('colors')
        .then(versions => ({
          rows: versions,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Model.findById(params.id)
    .populate('options')
    .populate('colors')
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Model.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, model }, res, next) =>
  Model.findById(params.id)
    .then(notFound(res))
    .then(version => (version ? Object.assign(version, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Model.findById(params.id)
    .then(notFound(res))
    .then(version => (version ? version.remove() : null))
    .then(success(res, 204))
    .catch(next)
