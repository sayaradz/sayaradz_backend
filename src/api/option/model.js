import mongoose, { Schema } from 'mongoose'

const Option = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      maxlength: 20,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

const OptionModel = mongoose.model('options', Option)

export const OptionSchema = OptionModel.schema
export default OptionModel
