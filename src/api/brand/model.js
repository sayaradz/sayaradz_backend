import mongoose, { Schema } from 'mongoose'

const Brand = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    logo: {
      type: String
    },
    models: [{ type: Schema.Types.ObjectId, ref: 'model' }]
  },
  {
    timestamps: true
  }
)

const BrandModel = mongoose.model('brands', Brand)

export const BrandSchema = BrandModel.schema
export default BrandModel
