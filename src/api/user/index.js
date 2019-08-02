import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  password as passwordAuth,
  master,
  token
} from '../../services/passport'
import {
  index,
  showMe,
  show,
  create,
  addManufacturer,
  removeManufacturer,
  follow,
  unfollow,
  followed,
  isFollowing,
  notifications,
  update,
  updatePassword,
  destroy
} from './controller'
import { schema } from './model'

const router = new Router()
const { email, password, name, picture, role } = schema

/*
router.get('/', token({ required: true, roles: ['admin'] }), query(), index)

router.get('/me', token({ required: true }), showMe)

router.get('/:id', show)
*/

router.get('/:id', show)

router.post('/', body({ email, password, name, picture, role }), create)

router.post('/:id/manufacturers', addManufacturer)

router.get('/:id/follows/models', query(), followed('models'))

router.get('/:id/follows/versions', query(), followed('versions'))

router.get('/:id/follows/models/:followed', isFollowing('models'))

router.get('/:id/follows/versions/:followed', isFollowing('versions'))

router.get('/:id/notifications', query(), notifications)

router.post('/:id/follows/models', follow('models'))

router.post('/:id/follows/versions', follow('versions'))

router.delete('/:id/follows/models/:followed', unfollow('models'))

router.delete('/:id/follows/versions/:followed', unfollow('versions'))

router.delete('/:id/manufacturers/:manufacturer_id', removeManufacturer)

/*
router.put('/:id', token({ required: true }), body({ name, picture }), update)

router.put('/:id/password', passwordAuth(), body({ password }), updatePassword)

router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy)
*/
export default router
