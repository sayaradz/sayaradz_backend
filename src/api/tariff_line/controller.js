import { success, notFound } from '../../services/response/'
import TariffLine from './model'
import Follow from '../follow/model'
import Notif from '../notification/model'

import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    project_id: 'sayaradz-47663'
  }),
  databaseURL: 'https://sayaradz-47663.firebaseio.com'
})

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
    if (tariffLine.tariff_type == 'versions') {
      const followedTariffLines = await Follow.find({
        followed: tariffLine.tariff_target._id
      })
        .populate('follower')
        .lean()
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

const notifyUser = async (user, message) => {
  const notif = {
    message,
    concern_user: user._id
  }
  const fcmNotif = {
    notification: {
      title: 'New SayaraDZ notification',
      body: notif.message
    },
    token: user.fcm_id
  }
  admin
    .messaging()
    .send(fcmNotif)
    .then(async response => {
      console.log(response)
      await Notif.create(notif)
    })
    .catch(err => {
      console.log(err)
    })
}
export const destroy = ({ params }, res, next) =>
  TariffLine.findById(params.id)
    .then(notFound(res))
    .then(brand => (brand ? brand.remove() : null))
    .then(success(res, 204))
    .catch(next)
