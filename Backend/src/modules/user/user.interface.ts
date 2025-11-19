import { Types } from "mongoose";

export enum Role{
    SUPER_ADMIN="SUPER_ADMIN",
    ADMIN="ADMIN",
    SELLER="SELLER",
    BUYER="BUYER"
}

export enum Status{
    PENDING="PENDING", // by default
    ACTIVE="ACTIVE", // Admin krte parbe
    SUSPEND="SUSPEND", // Admin krte parbe
}


export interface IUser{
    _id?: Types.ObjectId,
    name: string,
    email: string,
    password: string,
    
    universityId?: string,
    phone?: string,
    presentAddress?: string,
    picture?: string,
    activeRole?: Role,
    isVerified?: boolean, //verify after email verification
    isStatus?: Status,
    transactions?: Types.ObjectId[],
    wallet?: Types.ObjectId, 
    items?: Types.ObjectId[], // jei product gula se post krbe
    rentals?: Types.ObjectId[] // jei product gula se rent nibe or kinbe
}


export interface UserQueryParams {
  search?: string;
  role?: Role;
  status?: Status;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}




