import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import Brand from '../brand/model'
import Version from '../version/model'
import Option from '../option/model'
import Color from '../color/model'
import Vehicle from '../vehicle/model'
import TariffLine from '../tariff_line/model'
import { Types } from 'mongoose'

export const estimatePrice = async (
  { query: { version, color, options = '' } },
  res,
  next
) => {
  try {
    version = Types.ObjectId.isValid(version) ? version : null
    color = Types.ObjectId.isValid(color) ? color : null
    options = options.split(',').filter(o => Types.ObjectId.isValid(o))
    options = options.length > 0 ? options : null
    const tariffs = await TariffLine.find({
      $or: [
        { tariff_type: 'versions', tariff_target: version },
        { tariff_type: 'colors', tariff_target: color },
        { tariff_type: 'options', tariff_target: { $in: options } }
      ]
    }).lean()
    const totalPrice = tariffs.reduce(
      (total, current) => total + current.price,
      0
    )
    res.json({
      tariffLines: tariffs,
      totalPrice
    })
  } catch (err) {
    next(err)
  }
}

export const getAvailableInModels = async ({ params: { id } }, res, next) => {
  try {
    const brand = await Brand.findById(id)
      .populate('models', '-versions')
      .lean()
    const availableVehicles = await Vehicle.find({ available: true })
    const availableVehiclesModels = availableVehicles.map(v =>
      v.model.toString()
    )
    const availableModels = brand.models.filter(m =>
      availableVehiclesModels.includes(m._id.toString())
    )
    res.json(availableModels)
  } catch (err) {
    next(err)
  }
}

export const getAvailableInVersions = async ({ params: { id } }, res, next) => {
  try {
    const availableVehicles = await Vehicle.find({ model: id, available: true })
      .populate({
        path: 'model',
        populate: { path: 'versions', select: '-colors -options' }
      })
      .lean()
    const availableVersions = availableVehicles.map(v => v.model.versions)
    res.json(availableVersions.flat())
  } catch (err) {
    next(err)
  }
}

export const getAvailableInOptions = async ({ params: { id } }, res, next) => {
  try {
    const availableVehicles = await Vehicle.find({
      version: id,
      available: true
    })
      .populate({
        path: 'model',
        populate: {
          path: 'versions',
          populate: { path: 'options', select: '-brands' }
        }
      })
      .lean()
    const availableOptions = availableVehicles.map(v =>
      v.model.versions.map(version => version.options)
    )
    res.json(availableOptions.flat(2))
  } catch (err) {
    next(err)
  }
}

export const getAvailableInColors = async ({ params: { id } }, res, next) => {
  try {
    const availableVehicles = await Vehicle.find({
      version: id,
      available: true
    })
      .populate({
        path: 'model',
        populate: { path: 'versions', populate: { path: 'colors' } }
      })
      .lean()
    const availableColors = availableVehicles.map(v =>
      v.model.versions.map(version => version.colors)
    )
    res.json(availableColors.flat(2))
  } catch (err) {
    next(err)
  }
}
