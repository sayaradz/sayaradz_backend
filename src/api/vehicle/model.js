import mongoose, { Schema } from 'mongoose'

const Vehicle = new Schema(
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

const VehicleModel = mongoose.model('vehicle', Vehicle)

export const VehicleSchema = VehicleModel.schema
export default VehicleModel
