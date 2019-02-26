import { success, notFound } from '../../services/response/'
import Manufacturer from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
Manufacturer.count(query)
    .then(count =>
      Manufacturer.find(query, select, cursor).then(manufacturers => ({
        rows: manufacturers,
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
Manufacturer.findById(params.id)
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
Manufacturer.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, manufacturer }, res, next) =>
Manufacturer.findById(params.id)
    .then(notFound(res))
    .then(manufacturer => (manufacturer ? Object.assign(manufacturer, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
Manufacturer.findById(params.id)
    .then(notFound(res))
    .then(manufacturer => (manufacturer ? manufacturer.remove() : null))
    .then(success(res, 204))
    .catch(next)
