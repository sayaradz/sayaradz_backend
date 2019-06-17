import { success, notFound } from '../../services/response/'
import Brand from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Brand.count(query)
    .then(count =>
      Brand.find(query, select, cursor)
        .populate({ path: 'models', select: '-versions' })
        .then(brands => ({
          rows: brands,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Brand.findById(params.id)
    .populate({ path: 'models', select: '-versions' })
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Brand.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const addModel = (req, res, next) => {
  const { model_id } = req.body
  const { id } = req.params
  Brand.findByIdAndUpdate(
    id,
    {
      $push: { models: model_id }
    },
    { new: true }
  )
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })
}

export const removeModel = ({ params }, res, next) =>
  Brand.findByIdAndUpdate(params.id, { $pull: { models: params.model_id } })
    .then(success(res, 204))
    .catch(next)

export const update = ({ bodymen: { body }, params, brand }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? Object.assign(brand, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Brand.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? brand.remove() : null))
    .then(success(res, 204))
    .catch(next)
