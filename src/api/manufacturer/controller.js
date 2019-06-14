import { success, notFound } from '../../services/response/'
import Manufacturer from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Manufacturer.count(query)
    .then(count =>
      Manufacturer.find(query, select, cursor)
        .populate('brands')
        .then(manufacturers => ({
          rows: manufacturers,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Manufacturer.findById(params.id)
    .populate('brands')
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Manufacturer.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const addBrand = (req, res, next) => {
  const { brand_id } = req.body
  const { id } = req.params
  Manufacturer.findByIdAndUpdate(
    id,
    {
      $push: { brands: brand_id }
    },
    { new: true }
  )
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })
}

export const removeBrand = ({ params }, res, next) =>
  Manufacturer.findByIdAndUpdate(params.id, {
    $pull: { brands: params.brand_id }
  })
    .then(success(res, 204))
    .catch(next)

export const update = (
  { bodymen: { body }, params, manufacturer },
  res,
  next
) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then(manufacturer =>
      manufacturer ? Object.assign(manufacturer, body).save() : null
    )
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then(manufacturer => (manufacturer ? manufacturer.remove() : null))
    .then(success(res, 204))
    .catch(next)
