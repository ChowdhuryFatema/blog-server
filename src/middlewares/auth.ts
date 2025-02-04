import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization?.split(' ')[1];
    const token = req.headers.authorization?.split(' ')[1];

    // if the token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    // req.user = user;
    next();
  });
};

export default auth;
