import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  //   checking if the user is exist
  const user = await User.isUserExistsById(payload.email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is blocked
  const userStatus = user.isBlocked;
  if (userStatus === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not matched !');
  }

  // create token and sent to the client

  const jwtPayload = {
    email: user.email,
    password: user.password,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsById(userData.email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }


  // checking if the user is already deleted
  // const isUserDeleted = user.isDeleted;
  // if (isUserDeleted) {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  // }
  // // checking if the user is blocked
  // const userStatus = user.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  // }



  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not matched !');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};


const refreshToken = async (token: string) => {
  // if the token is sent from the client
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsById(email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user.isBlocked;
  if (userStatus === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  }

  const jwtPayload = {
    email: user.email,
    password: user.password,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
};