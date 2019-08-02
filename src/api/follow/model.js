import mongoose, { Schema } from 'mongoose'

const followSchema = new Schema(
  {
    follower: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    followed_type: {
      type: String,
      enum: ['models', 'versions']
    },
    followed: {
      type: Schema.ObjectId,
      refPath: 'followed_type'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

followSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      follower: this.follower.view(full),
      followed_type: this.followed_type,
      followed: this.followed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view
  }
}

followSchema.index({ follower: 1, followed: 1 }, { unique: true })

const model = mongoose.model('Follow', followSchema)

export const schema = model.schema
export default model
