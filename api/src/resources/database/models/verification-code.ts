import mongoose, { Schema } from 'mongoose';
import { VerificationCodeDocument, VerificationCodeType } from '../_types';

const verificationCodeSchema = new Schema<VerificationCodeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(VerificationCodeType),
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const VerificationCodeModel = mongoose.model<VerificationCodeDocument>('VerificationCode', verificationCodeSchema);
