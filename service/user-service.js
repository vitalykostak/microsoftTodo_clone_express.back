import UserModel from '../models/User.js';

class UserService {
  async getUserById(id) {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        return {
          id: user._id,
          firstName: user.firstName,
          surname: user.surname,
          username: user.username,
        };
      }
      throw next(ApiError.NotFound('Пользователь не найден'));
    } catch (e) {
      throw e;
    }
  }
}

export default new UserService();
