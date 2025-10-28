import AppError from "../../errorHelpers/AppError";
import { IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../config/env";
import { Wallet } from "../wallet/wallet.model";
import { WalletStatus } from "../wallet/wallet.interface";
import { extractUniversityId } from "../../utils/userIdExtract";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, activeRole, ...rest } = payload;

  if (activeRole && ![Role.BUYER, Role.SELLER].includes(activeRole)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid role! You can only register as Buyer or Seller"
    );
  }

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exits");
  }

  // check this users email is from bubt or not?
  const universityId= extractUniversityId(email as string) 

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await User.create({
    email,
    activeRole,
    password: hashedPassword,
    universityId,
    ...rest,
  });

  if (user.activeRole === Role.BUYER || user.activeRole === Role.SELLER) {
    const wallet = await Wallet.create({
      ownerId: user._id,
      balance: 100,
      status: WalletStatus.ACTIVE,
    });
    // step-3: save wallet id to user's list

    user.wallet = wallet._id;
    await user.save();
  }

  const finalUser = await User.findById(user._id).populate("wallet").lean(); //.lean returns plain object instead of mongoose document instance

  if (finalUser) {
    delete (finalUser as any).password;
  }

  return finalUser;
};

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExits = await User.findOne({ email });

  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exists");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExits.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const userToken = createUserToken(isUserExits);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...res } = isUserExits.toObject();

  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: res,
  };
};


export const AuthServices = {
  createUser,
  credentialLogin
};
