import { success, notFound } from '../../services/response/'
import Option from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Option.count(query)
    .then(count =>
      Option.find(query, select, cursor)
        .populate('options')
        .populate('colors')
        .then(options => ({
          rows: options,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Option.findById(params.id)
    .populate('options')
    .populate('colors')
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Option.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, model }, res, next) =>
  Option.findById(params.id)
    .then(notFound(res))
    .then(option => (option ? Object.assign(option, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Option.findById(params.id)
    .then(notFound(res))
    .then(option => (option ? option.remove() : null))
    .then(success(res, 204))
    .catch(next)
