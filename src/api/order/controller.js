import { success, notFound } from '../../services/response/'
import Order from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Order.count(query)
    .then(count =>
      Order.find(query, select, cursor)
        .populate('version', '-options -colors')
        .populate('color')
        .populate('options', '-brands')
        .populate('user')
        .then(orders => ({
          rows: orders,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Order.findById(params.id)
    .populate('version', '-options -colors')
    .populate('color')
    .populate('options', '-brands')
    .populate('user')
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Order.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, order }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then(order => (order ? Object.assign(order, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then(order => (order ? order.remove() : null))
    .then(success(res, 204))
    .catch(next)
