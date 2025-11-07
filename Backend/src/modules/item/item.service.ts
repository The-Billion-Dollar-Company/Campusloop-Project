import httpStatus from "http-status-codes";
import { IItem, ItemStatus, QueryParams } from "./Item.interface";
import { Item } from "./item.model";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { Status } from "../user/user.interface";

const createItem = async (payload: Partial<IItem>, userId: string) => {
  // Basic validation
  if (
    !payload.ownerId ||
    !payload.title ||
    !payload.price ||
    !payload.sellingCategory ||
    !payload.availability ||
    !payload.objectCategory
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Missing required fields for item creation"
    );
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  if (payload.ownerId.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not allowed to post from this account"
    );
  }

  const item = await Item.create(payload);
  user.items = user.items || []; // ensure array exists

  user.items.push(item._id);
  await user.save();
  await item.populate("ownerId", "name");
  return item;
};

const allItem = async (query: QueryParams) => {
  const {
    search,
    category, // listed category item
    sellingCategory, // SELL RENT SKILL
    availability,
    minPrice,
    maxPrice,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = "1",
    limit = "10",
  } = query;

  const filters: any = {};

  if (search) {
    filters.$or = [{ title: { $regex: search, $options: "i" } }];
  }

  if (category) {
    filters.objectCategory = category.toUpperCase();
  }

  if(sellingCategory){
    filters.sellingCategory = sellingCategory.toUpperCase();
  }

  if(availability){
    filters.availability = availability.toUpperCase();
  }

  if(minPrice || maxPrice){
    filters.price={}
    if(minPrice) filters.price.$gte = Number(minPrice)
    if(maxPrice) filters.price.$lte = Number(maxPrice)
  }

  filters.status = "PUBLISHED"

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1)*limitNum

  const sortOptions:any = {};
  sortOptions[sortBy] = sortOrder === 'asc' ? 1:-1;


  const [items, totalItems] = await Promise.all([
    Item.find(filters).populate("ownerId", "name email universityId picture").sort(sortOptions).skip(skip).limit(limitNum), Item.countDocuments(filters)
  ])

  return {
    data: items,
    meta: {
      total: totalItems,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalItems / limitNum),
    },
  };
};

const itemById = async (id: string) => {
  const res = await Item.findById(id).populate(
    "ownerId",
    "name email universityId picture"
  );

  if (!res) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found");
  }

  return res;
};

const updateItem = async (
  id: string,
  userId: string,
  payload: Partial<any>
) => {
  const item = await Item.findById(id);

  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found");
  }

  if (item.ownerId.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not allowed to delete this item"
    );
  }

  const updateItem = await Item.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  // new = true, noton document return krbe(bydefault update krle prev document return kore)
  // runValidator = update korar time e Item Schema check kore update krbe.

  return updateItem;
};

const toggleStatus = async (
  id: string,
  status: ItemStatus
) => {
  const item = await Item.findById(id);

  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found");
  }

  item.status = status
  item.save()

  // const updateItem = await Item.findByIdAndUpdate(id, status, {
  //   new: true,
  //   runValidators: true,
  // });
  // new = true, noton document return krbe(bydefault update krle prev document return kore)
  // runValidator = update korar time e Item Schema check kore update krbe.

  return item;
};

const deleteItem = async (userId: string, id: string) => {
  const item = await Item.findById(id);
  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found");
  }
  if (item.ownerId.toString() !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not allowed to delete this item"
    );
  }

  await item.deleteOne();

  await User.findByIdAndUpdate(userId, { $pull: { items: id } });

  return item;
};

export const ItemServices = {
  createItem,
  allItem,
  itemById,
  updateItem,
  deleteItem,
  toggleStatus
};
