import mongoose, { Schema } from 'mongoose'

const Model = new Schema(
  {
    chassis_number: {
      type: Number,
      unique: true,
      required: true
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'models'
    },
    version: {
      type: Schema.Types.ObjectId,
      ref: 'versions'
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: 'colors'
    }
  },
  {
    timestamps: true
  }
)

const ModelModel = mongoose.model('models', Model)

export const ModelSchema = ModelModel.schema
export default ModelModel
