import { IUser } from "./user.interface";
import { User } from "./user.model";


const createUser = (payload: IUser) => {
    const result = User.create(payload);
    return result;
}

export const UserServices = {
    createUser,
}