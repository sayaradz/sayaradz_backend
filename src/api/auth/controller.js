import { sign } from '../../services/jwt'
import { success } from '../../services/response/'

export const signin = ({ user }, res, next) =>
  sign(user._id)
    .then(token => ({ token, user }))
    .then(success(res, 201))
    .catch(next)
