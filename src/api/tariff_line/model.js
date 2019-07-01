import mongoose, { Schema } from 'mongoose'

const TariffLine = new Schema(
  {
    tariff_target: {
      type: Schema.Types.ObjectId,
      refPath: 'tariff_type'
    },
    tariff_type: {
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

TariffLine.index({ tariff_type: 1, tariff_target: 1 })

const TariffLineModel = mongoose.model('tariff-line', TariffLine)

export const TariffLineSchema = TariffLineModel.schema
export default TariffLineModel
