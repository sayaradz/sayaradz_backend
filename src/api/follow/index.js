import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Follow, { schema } from './model'

const router = new Router()
const { followed_type, followed } = schema.tree

/**
 * @api {post} /follows Create follow
 * @apiName CreateFollow
 * @apiGroup Follow
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam followed_type Follow's followed_type.
 * @apiParam followed Follow's followed.
 * @apiSuccess {Object} follow F
 * ollow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Follow not found.
 * @apiError 401 user access only.
 */
router.post(
  '/',
  token({ required: true }),
  body({ followed_type, followed }),
  create
)

/**
 * @api {get} /follows Retrieve follows
 * @apiName RetrieveFollows
 * @apiGroup Follow
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of follows.
 * @apiSuccess {Object[]} rows List of follows.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query(), index)

/**
 * @api {get} /follows/:id Retrieve follow
 * @apiName RetrieveFollow
 * @apiGroup Follow
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} follow Follow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Follow not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show)

/**
 * @api {put} /follows/:id Update follow
 * @apiName UpdateFollow
 * @apiGroup Follow
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam followed_type Follow's followed_type.
 * @apiParam followed Follow's followed.
 * @apiSuccess {Object} follow Follow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Follow not found.
 * @apiError 401 user access only.
 */
router.put(
  '/:id',
  token({ required: true }),
  body({ followed_type, followed }),
  update
)

/**
 * @api {delete} /follows/:id Delete follow
 * @apiName DeleteFollow
 * @apiGroup Follow
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Follow not found.
 * @apiError 401 user access only.
 */
router.delete('/:id', token({ required: true }), destroy)

export default router
