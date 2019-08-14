import { success, notFound } from '../../services/response/'
import TariffLine from './model'
import Follow from '../follow/model'
import Notif from '../notification/model'

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

export const update = async ({ body, params }, res, next) => {
  try {
    const tariffLine = await TariffLine.findByIdAndUpdate(params.id, body, {
      new: true
    }).populate('tariff_target')
    console.log(tariffLine)
    if (tariffLine.tariff_type == 'versions') {
      const followedTariffLines = await Follow.find({
        followed: tariffLine.tariff_target._id
      }).lean()
      const followingUsers = followedTariffLines.map(f => f.follower)
      followingUsers.forEach(
        async user =>
          await notifyUser(
            user,
            `Une mise à jour sur ${
              tariffLine.tariff_target.name
            } à été effectué.`
          )
      )
    }
    res.json(tariffLine)
  } catch (err) {}
}

const notifyUser = async (userId, message) => {
  const notif = {
    message,
    concern_user: userId
  }
  await Notif.create(notif)
}
export const destroy = ({ params }, res, next) =>
  TariffLine.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? brand.remove() : null))
    .then(success(res, 204))
    .catch(next)
