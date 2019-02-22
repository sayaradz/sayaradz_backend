import mongoose, { Schema } from 'mongoose'

const Manufacturer = new Schema(
  {
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

const ManufacturerModel = mongoose.model('options', Manufacturer)

export const ManufacturerSchema = ManufacturerModel.schema
export default ManufacturerModel
