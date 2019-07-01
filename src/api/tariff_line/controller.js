import { success, notFound } from '../../services/response/'
import TariffLine from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  TariffLine.count(query)
    .then(count =>
      TariffLine.find(query, select, cursor)
        .populate('tariff_target')
        .then(brands => ({
          rows: brands,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  TariffLine.findById(params.id)
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  TariffLine.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const update = ({ bodymen: { body }, params, brand }, res, next) =>
  TariffLine.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? Object.assign(brand, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  TariffLine.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? brand.remove() : null))
    .then(success(res, 204))
    .catch(next)
