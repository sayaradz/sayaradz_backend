import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
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
