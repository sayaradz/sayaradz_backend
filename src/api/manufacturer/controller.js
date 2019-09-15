import { success, notFound } from '../../services/response/'
import Manufacturer from './model'
import Brand from '../brand/model'
import Model from '../model/model'
import Vehicle from '../vehicle/model'
import TariffLine from '../tariff_line/model'

const User = require('mongoose').model('User')

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Manufacturer.count(query)
    .then(count =>
      Manufacturer.find(query, select, cursor)
        .populate({ path: 'brands', select: '-models' })
        .then(manufacturers => ({
          rows: manufacturers,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const vehicles = async (req, res, next) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id).lean()
    const brands = await Brand.find({
      _id: { $in: manufacturer.brands }
    }).lean()
    const models = brands.map(b => b.models).flat()
    const vehicles = await Vehicle.find({ model: { $in: models } })
      .populate('model')
      .populate('version')
      .populate('color')
      .lean()
    res.json(vehicles)
  } catch (err) {
    next(err)
  }
}

export const tarifflines = async (req, res, next) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id).lean()
    const brands = await Brand.find({
      _id: { $in: manufacturer.brands }
    }).lean()
    const models = brands.map(b => b.models).flat()
    const versions = models.map(m => m.versions)
    const options = versions.map(v => v.options)
    const colors = versions.map(v => v.colors)
    const tarifflines = await TariffLine.find({
      tariff_target: { $in: [...versions, ...colors, ...options] }
    })
    res.json(tarifflines)
  } catch (err) {
    next(err)
  }
}

export const read = ({ params }, res, next) =>
  Manufacturer.findById(params.id)
    .populate({ path: 'brands', select: '-models' })
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

export const getUsers = async (req, res, next) => {
  const { id } = req.params
  try {
    console.log(id)
    const manufacturers = await Manufacturer.find({}).lean()
    console.log({ manufacturers })
    const users = await User.find({ manufacturers_access: id })
    console.log({ users })
    res.json(users)
  } catch (err) {
    next(err)
  }
}

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

export const destroy = async ({ params }, res, next) => {
  const adminUser = await User.update(
    { manufacturers_access: params.id },
    { $pull: { manufacturers_access: params.id } }
  ).lean()
  Manufacturer.findById(params.id)
    .then(notFound(res))
    .then(manufacturer => (manufacturer ? manufacturer.remove() : null))
    .then(success(res, 204))
    .catch(next)
}
