import mongoose, { Schema } from 'mongoose'

const Model = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      maxlength: 10,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    versions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'versions'
      }
    ]
  },
  {
    timestamps: true
  }
)

const ModelModel = mongoose.model('models', Model)

export const ModelSchema = ModelModel.schema
export default ModelModel
