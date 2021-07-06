import userService from '../service/user-service.js';
import ApiError from '../exceptions/api-exception.js';

class UserController {
  // find usser by userId from accesToken
  async getMe(req, res, next) {
    try {
      const { userId } = req.$requestor;
      const user = await userService.getUserById(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
