import mongoose, { Schema } from 'mongoose'

const TariffLine = new Schema(
  {
    tariff_type: {
      type: Schema.Types.ObjectId,
      refPath: 'tariff_type_model'
    },
    tariff_type_model: {
      type: String,
      enum: ['options', 'colors', 'versions']
    },
    d_from: {
      type: Date
    },
    d_to: {
      type: Date
    },
    price: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const TariffLineModel = mongoose.model('tariff-line', TariffLine)

export const TariffLineSchema = TariffLineModel.schema
export default TariffLineModel
