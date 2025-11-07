import { model, Schema, Types } from "mongoose";
import {
  IItem,
  ItemCategory,
  Availability,
  ObjectCategory,
  ItemStatus,
} from "./Item.interface";

const itemSchema = new Schema<IItem>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    deposit: {
      type: Number,
      min: 0,
      default: 0,
    },
    condition: {
      type: String,
      enum: ["NEW", "USED"],
    },
    sellingCategory: {
      type: String,
      enum: Object.values(ItemCategory),
      required: true,
    },
    availability: {
      type: String,
      enum: Object.values(Availability),
      default: Availability.IN_STOCK,
    },
    status: {
      type: String,
      enum: Object.values(ItemStatus),
      default: ItemStatus.PENDING,
    },
    objectCategory: {
      type: String,
      enum: Object.values(ObjectCategory),
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },
    picture: {
      type: String,
    },
    pictures: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Item = model<IItem>("Item", itemSchema);
