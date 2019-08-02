import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Notification, { schema } from './model'

const router = new Router()
const { message, seen, concern_user } = schema.tree

/**
 * @api {post} /notifications Create notification
 * @apiName CreateNotification
 * @apiGroup Notification
 * @apiParam message Notification's message.
 * @apiParam seen Notification's seen.
 * @apiParam concern_user Notification's concern_user.
 * @apiSuccess {Object} notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 */
router.post('/',
  body({ message, seen, concern_user }),
  create)

/**
 * @api {get} /notifications Retrieve notifications
 * @apiName RetrieveNotifications
 * @apiGroup Notification
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of notifications.
 * @apiSuccess {Object[]} rows List of notifications.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /notifications/:id Retrieve notification
 * @apiName RetrieveNotification
 * @apiGroup Notification
 * @apiSuccess {Object} notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /notifications/:id Update notification
 * @apiName UpdateNotification
 * @apiGroup Notification
 * @apiParam message Notification's message.
 * @apiParam seen Notification's seen.
 * @apiParam concern_user Notification's concern_user.
 * @apiSuccess {Object} notification Notification's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notification not found.
 */
router.put('/:id',
  body({ message, seen, concern_user }),
  update)

/**
 * @api {delete} /notifications/:id Delete notification
 * @apiName DeleteNotification
 * @apiGroup Notification
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Notification not found.
 */
router.delete('/:id',
  destroy)

export default router
