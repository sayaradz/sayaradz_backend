import { success, notFound } from '../../services/response/'
import Order from './model'
import Version from '../version/model'

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

export const trendingVersions = async ({ params }, res, next) => {
  try {
    const orders = await Order.find().populate('version')
    const orderedVersions = orders.map(order => order.version)
    const orderedVersionsFrequency = {}
    orderedVersions.forEach(v => {
      const versionFrequency = orderedVersionsFrequency[`${v._id}`]
      orderedVersionsFrequency[`${v._id}`] = versionFrequency
        ? versionFrequency + 1
        : 1
    })
    let versions = await Version.find({}, '-colors -options').lean()
    versions = versions.sort((a, b) => {
      const frequencyA = orderedVersionsFrequency[`${a._id}`] || 0
      const frequencyB = orderedVersionsFrequency[`${b._id}`] || 0
      return frequencyB - frequencyA
    })
    res.json(versions)
  } catch (err) {
    next(err)
  }
}

export const create = ({ bodymen: { body } }, res, next) =>
  Order.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, order }, res, next) => {
  Order.findByIdAndUpdate(params.id, body)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then(order => (order ? order.remove() : null))
    .then(success(res, 204))
    .catch(next)
