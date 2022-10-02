import mongoose from "mongoose";

import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PaymentAttrs {
  stripeId: string;
  orderId: string;
}
interface PaymentDoc extends mongoose.Document {
  stripeId: string;
  orderId: string;
}
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}
const PaymentSchema = new mongoose.Schema(
  {
    stripeId: { type: String, required: true },
    orderId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

PaymentSchema.set("versionKey", "version");
PaymentSchema.plugin(updateIfCurrentPlugin);
PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};
const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "payment",
  PaymentSchema
);
export { Payment };
