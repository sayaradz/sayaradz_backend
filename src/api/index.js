import { Router } from 'express'
import Brand from './brand'
import Auth from './auth'
import User from './user'
import Model from './model'
import Manufacturer from './manufacturer'
import Version from './version'
import Option from './option'
import Vehicle from './vehicle'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

/*router.use('/password-resets', passwordReset)*/

router.use('/users', User)
router.use('/auth', Auth)
router.use('/brands', Brand)
router.use('/manufacturers', Manufacturer)
router.use('/models', Model)
router.use('/versions', Version)
router.use('/options', Option)
router.use('/vehicles', Vehicle)

export default router
