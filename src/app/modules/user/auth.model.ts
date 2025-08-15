import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";
import config from "../../config";


const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook → password hash before save
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

// Post-save hook → remove password from returned object
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<IUser>("User", UserSchema);
