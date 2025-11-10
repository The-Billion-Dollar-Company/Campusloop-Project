import { model, Schema} from "mongoose";
import { IWallet, WalletStatus } from "./wallet.interface";

const WallerSchema = new Schema<IWallet>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique:true },
    balance: { type: Number, default: 100 },
    status: {
      type: String,
      enum: Object.values(WalletStatus),
      default: WalletStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const Wallet =  model<IWallet>("Wallet", WallerSchema);