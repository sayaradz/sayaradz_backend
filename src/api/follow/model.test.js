import { Follow } from '.'
import { User } from '../user'

let user, follow

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  follow = await Follow.create({ follower: user, followed_type: 'test', followed: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = follow.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(follow.id)
    expect(typeof view.follower).toBe('object')
    expect(view.follower.id).toBe(user.id)
    expect(view.followed_type).toBe(follow.followed_type)
    expect(view.followed).toBe(follow.followed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = follow.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(follow.id)
    expect(typeof view.follower).toBe('object')
    expect(view.follower.id).toBe(user.id)
    expect(view.followed_type).toBe(follow.followed_type)
    expect(view.followed).toBe(follow.followed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
