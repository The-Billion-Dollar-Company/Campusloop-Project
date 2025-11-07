import AppError from "../../errorHelpers/AppError";
import { QueryParams } from "../item/Item.interface";
import { Item } from "../item/item.model";
import { Status, UserQueryParams } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";

const updateUserStatus = async (userId: string, status: Status) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  user.isStatus = status;
  user.isVerified = true;

  await user.save();

  return user;
};

const allItems = async (query: QueryParams) => {
  const {
    search,
    category,
    sellingCategory,
    availability,
    minPrice,
    maxPrice,
    status,
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

  if (sellingCategory) {
    filters.sellingCategory = sellingCategory.toUpperCase();
  }

  if (status) {
    filters.status = status.toUpperCase();
  }

  if (availability) {
    filters.availability = availability.toUpperCase();
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = Number(minPrice);
    if (maxPrice) filters.price.$lte = Number(maxPrice);
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const sortOptions: any = {};
  sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

  const [items, totalItems] = await Promise.all([
    Item.find(filters)
      .populate("ownerId", "name email universityId picture")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum),
    Item.countDocuments(filters),
  ]);

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


export const allUsers = async (query: UserQueryParams) => {
  const {
    search,
    role,
    status,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = "1",
    limit = "10",
  } = query;

  const filters: any = {};

  // Search by name or email
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by role
  if (role) {
    filters.activeRole = role.toUpperCase();
  }

  // Filter by status
  if (status) {
    filters.isStatus = status.toUpperCase();
  }

  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Sorting
  const sortOptions: any = {};
  sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

  // Query DB
  const [users, totalUsers] = await Promise.all([
    User.find(filters)
      .populate("items", "title price sellingCategory availability picture")
      .populate("rentals", "itemId status rentDate returnDate")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum),
    User.countDocuments(filters),
  ]);

  return {
    data: users,
    meta: {
      total: totalUsers,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalUsers / limitNum),
    },
  };
};

export const AdminServices = {
  updateUserStatus,
  allItems,
  allUsers
};
