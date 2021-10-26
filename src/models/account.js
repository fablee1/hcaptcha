import mongoose from "mongoose"

const { Schema, model } = mongoose

const AccountSchema = new Schema(
  {
    owner: String,
    expiresAt: { type: Date, default: new Date() },
    address: String,
    tw: String,
    total_gifts: { type: Number, default: 0 },
    failed: { type: Boolean, default: false },
    time: { type: Number, default: 0 },
    referrals: { type: Number, default: 0 },
    approved_referrals: { type: Number, default: 0 },
    discord: { type: Boolean, default: false },
    twitter: { type: String, default: "false" },
  },
  { timestamps: true }
)

export default model("acc", AccountSchema)
