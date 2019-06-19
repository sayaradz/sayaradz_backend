import mongoose, { Schema } from 'mongoose'

const Color = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      maxlength: 3,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      default: '#000000'
    }
  },
  {
    timestamps: true
  }
)

const ColorModel = mongoose.model('colors', Color)

export const ColorSchema = ColorModel.schema
export default ColorModel
