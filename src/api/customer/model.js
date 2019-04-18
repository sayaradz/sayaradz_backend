import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String
    },
    picture: {
      type: String
    },
    fullname: {
      type: String
    },
    following: [
      
    ]
  },
  {
    timestamps: true
  }
)

/*
userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

userSchema.statics = {
  roles,

  createFromService ({ service, id, email, name, picture }) {
    return this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] }).then((user) => {
      if (user) {
        user.services[service] = id
        user.name = name
        user.picture = picture
        return user.save()
      } else {
        const password = randtoken.generate(16)
        return this.create({ services: { [service]: id }, email, password, name, picture })
      }
    })
  }
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })
*/
const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
