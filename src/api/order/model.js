import mongoose, { Schema } from 'mongoose'

const Order = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'vehicle' },
    order_date: { type: Date },
    amount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

Order.index({ vehicle: 1 })
Order.index({ order_date: 1 })

const OrderModel = mongoose.model('ordres', Order)

export const OrderSchema = OrderModel.schema
export default OrderModel
