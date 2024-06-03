import { errors } from "@/lib/app-error";
import mongooseConnect from "@/lib/mongodb/mongoose";
import UserModel, { User } from "@/models/user";

export class UserRepository {
  async createUser(user: User) {
    await mongooseConnect();
    const newUser = new UserModel(user);
    await newUser.save();
  }

  async checkUserByEmail(email: string): Promise<boolean> {
    try {
      await this.getUserByEmail(email);
      return true;
    } catch (error) {
      if (error === errors.userNotFound) {
        return false;
      }
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    await mongooseConnect();
    const user = await UserModel.findOne({
      email,
    }).exec();

    if (!user) {
      throw errors.userNotFound;
    }
    return user;
  }
}

const userRepository = new UserRepository();
export default userRepository;
