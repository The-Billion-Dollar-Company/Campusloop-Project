import { model, Schema } from "mongoose";
import { IUser, Role, Status } from "./user.interface";

const userSchema = new Schema<IUser>({
    name:{type: String, required: true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required: true},
    presentAddress: {type: String},
    activeRole: {
      type: String,
      enum: Object.values(Role),
      default: Role.BUYER,
    },
    isStatus: {
      type: String,
      enum: Object.values(Status),
      default: Status.PENDING,
    },
    picture: { type: String },
    universityId: { type: String },
    isVerified: { type: Boolean, default: false }, 
    
    transactions: [{
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    }],
    wallet:{
      type:Schema.Types.ObjectId,
      ref:"Wallet"
    },
    items:[{
      type:Schema.Types.ObjectId,
      ref:"Item"
    }],
    rentals:[{
      type:Schema.Types.ObjectId,
      ref:"Rentals"
    }],

},{
    timestamps: true,
    versionKey: false
})

export const User = model<IUser>("User", userSchema)