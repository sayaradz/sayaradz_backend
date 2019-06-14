import { success, notFound } from '../../services/response/'
import Version from './model'

export const list = ({ querymen: { query, select, cursor } }, res, next) =>
  Version.count(query)
    .then(count =>
      Version.find(query, select, cursor)
        .populate('options')
        .populate('colors')
        .then(versions => ({
          rows: versions,
          count
        }))
    )
    .then(success(res))
    .catch(next)

export const read = ({ params }, res, next) =>
  Version.findById(params.id)
    .populate('options')
    .populate('colors')
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) =>
  Version.create(body)
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })

export const addOption = (req, res, next) => {
  const { option_id } = req.body
  const { id } = req.params
  Version.findByIdAndUpdate(
    id,
    {
      $push: { options: option_id }
    },
    { new: true }
  )
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })
}

export const removeOption = ({ params }, res, next) =>
  Version.findByIdAndUpdate(params.id, {
    $pull: { options: params.option_id }
  })
    .then(success(res, 204))
    .catch(next)

export const addColor = (req, res, next) => {
  const { color_id } = req.body
  const { id } = req.params
  Version.findByIdAndUpdate(
    id,
    {
      $push: { colors: color_id }
    },
    { new: true }
  )
    .then(success(res, 201))
    .catch(err => {
      next(err)
    })
}

export const removeColor = ({ params }, res, next) =>
  Version.findByIdAndUpdate(params.id, {
    $pull: { colors: params.color_id }
  })
    .then(success(res, 204))
    .catch(next)

export const update = ({ bodymen: { body }, params, model }, res, next) =>
  Version.findById(params.id)
    .then(notFound(res))
    .then(version => (version ? Object.assign(version, body).save() : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Version.findById(params.id)
    .then(notFound(res))
    .then(version => (version ? version.remove() : null))
    .then(success(res, 204))
    .catch(next)
