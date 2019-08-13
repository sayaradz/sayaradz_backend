import mongoose, { Schema, Types } from 'mongoose'

const notificationSchema = new Schema(
  {
    message: {
      type: String,
      default: ''
    },
    seen: {
      type: Boolean,
      default: false
    },
    concern_user: {
      type: Types.ObjectId,
      model: 'User'
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

notificationSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      message: this.message,
      seen: this.seen,
      concern_user: this.concern_user,
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

const model = mongoose.model('Notification', notificationSchema)

export const schema = model.schema
export default model
