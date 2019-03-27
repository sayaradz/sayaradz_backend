import mongoose, { Schema } from 'mongoose'

const Version = new Schema(
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
    options: {
      type: Schema.Types.ObjectId,
      ref: 'options'
    },
    colors: [{ type: Schema.Types.ObjectId, ref: 'colors' }]
  },
  {
    timestamps: true
  }
)

const VersionModel = mongoose.model('versions', Version)

export const VersionSchema = VersionModel.schema
export default VersionModel
