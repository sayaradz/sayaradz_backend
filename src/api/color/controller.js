import { success, notFound } from '../../services/response/'
import Color from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Color.count(query)
    .then(count =>
      Color.find(query, select, cursor).then(brands => ({
        rows: brands,
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Color.findById(params.id)
    .populate('models')
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Color.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, brand }, res, next) =>
  Color.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? Object.assign(brand, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Color.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? brand.remove() : null))
    .then(success(res, 204))
    .catch(next)
