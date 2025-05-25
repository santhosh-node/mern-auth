import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../_types';

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    isEmailVerified: { type: Boolean, default: false },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    avatar: { type: String, default: null },
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.passwordSalt;
        return ret;
      },
    },
  }
);

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
