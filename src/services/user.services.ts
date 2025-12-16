import User from "../models/user.model";

class UserServices {
  async getUserByEmailWithPassword(email: string) {
    return await User.findOne({ email }).select("+password");
  }
  async getUserByEmail(email: string) {
    return await User.findOne({ email }).select("+password");
  }
}

const userServices = new UserServices();

export default userServices;
