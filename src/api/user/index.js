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
  listManufacturers,
  showMe,
  userFirebaseToId,
  show,
  create,
  addManufacturer,
  removeManufacturer,
  follow,
  unfollow,
  followed,
  isFollowing,
  notifications,
  orders,
  updateFirebaseUser,
  update,
  updatePassword,
  destroy
} from './controller'
import { schema } from './model'
import { list } from '../order/controller'

const router = new Router()
const { email, password, name, picture, role, status } = schema

router.get('/', query(), index)

/*router.get('/me', token({ required: true }), showMe)

router.get('/:id', show)
*/

router.get('/:id/manufacturers', listManufacturers)
router.get('/:id', show)

router.post('/', body({ email, password, name, picture, role }), create)

router.post('/:id/manufacturers', addManufacturer)

router.get('/:id/follows/models', query(), userFirebaseToId, followed('models'))

router.get(
  '/:id/follows/versions',
  query(),
  userFirebaseToId,
  followed('versions')
)

router.get(
  '/:id/follows/models/:followed',
  userFirebaseToId,
  isFollowing('models')
)

router.get(
  '/:id/follows/versions/:followed',
  userFirebaseToId,
  isFollowing('versions')
)

router.get('/:id/notifications', query(), userFirebaseToId, notifications)

router.post('/:id/follows/models', userFirebaseToId, follow('models'))

router.post('/:id/follows/versions', userFirebaseToId, follow('versions'))

router.delete(
  '/:id/follows/models/:followed',
  userFirebaseToId,
  unfollow('models')
)

router.delete(
  '/:id/follows/versions/:followed',
  userFirebaseToId,
  unfollow('versions')
)

router.delete('/:id/manufacturers/:manufacturer_id', removeManufacturer)

router.get('/:id/orders', query(), userFirebaseToId, orders)

router.put('/firebase_user', updateFirebaseUser)

router.put(
  '/:id/status',
  token({ required: true, roles: ['admin'] }),
  body({ status }),
  update
)

router.put('/:id/picture', token({ required: true }), body({ picture }), update)

/*
router.put('/:id/password', passwordAuth(), body({ password }), updatePassword)

router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy)
*/
export default router
