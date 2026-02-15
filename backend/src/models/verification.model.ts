import mongoose, { Document, Schema } from "mongoose";

export interface IVerification extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const verificationSchema = new Schema<IVerification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

verificationSchema.index({ userId: 1 });

const Verification = mongoose.model<IVerification>(
  "Verification",
  verificationSchema,
);

export default Verification;
