import mongoose, { Schema } from 'mongoose'

const Order = new Schema(
  {
    version: { type: Schema.Types.ObjectId, ref: 'versions' },
    color: { type: Schema.Types.ObjectId, ref: 'colors' },
    options: [{ type: Schema.Types.ObjectId, ref: 'options' }],
    order_date: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

Order.index({ order_date: 1 })

const OrderModel = mongoose.model('orders', Order)

export const OrderSchema = OrderModel.schema
export default OrderModel
