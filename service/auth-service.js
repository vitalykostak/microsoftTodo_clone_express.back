import bcrypt from 'bcrypt';

import ApiError from '../exceptions/api-exception.js';

import tokenService from './token-service.js';
import UserModel from '../models/User.js';
import User from '../models/User.js';

class AuthService {
  async registration(firstName, surname, username, password) {
    const candidat = await UserModel.findOne({ username });

    if (candidat) {
      throw ApiError.BadRequest('Имя пользователя уже занято', [
        {
          value: username,
          msg: 'Имя пользователя уже занято',
          param: 'username',
        },
      ]);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = new UserModel({
      firstName,
      surname,
      username,
      password: hashPassword,
    });
    await user.save();

    const { accesToken, refreshToken } = tokenService.generateTokens({
      userId: user._id,
      username: user.username,
    });
    await tokenService.saveToken(user._id, refreshToken);
    return {
      accesToken,
      refreshToken,
      userId: user._id,
      firstName: user.firstName,
      surname: user.surname,
      username: user.username,
    };
  }

  async login(username, password) {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw ApiError.BadRequest(
        `Пользователь ${username} - не зарегистрирован`,
        [
          {
            value: username,
            msg: `Пользователь ${username} - не зарегистрирован`,
            param: 'username',
          },
        ]
      );
    }

    const isTruePass = await bcrypt.compare(password, user.password);

    if (!isTruePass) {
      throw ApiError.BadRequest(`Пароль не верный`, [
        {
          msg: `Пароль - не верный`,
          param: 'password',
        },
      ]);
    }

    const { accesToken, refreshToken } = tokenService.generateTokens({
      userId: user._id,
      username: user.username,
    });

    await tokenService.saveToken(user._id, refreshToken);

    return {
      accesToken,
      refreshToken,
      userId: user._id,
      username: user.username,
    };
  }

  async logout(userId) {
    const result = await tokenService.deleteToken(userId);

    return result;
  }

  async refreshToken(token) {
    if (!token) {
      throw ApiError.Unauthorized('Refresh token отсутсвует');
    }

    const verifiedToken = tokenService.verifyRefreshToken(token);
    if (!verifiedToken) {
      throw ApiError.Unauthorized('Refresh token не прошел верификацию');
    }

    const userId = verifiedToken.userId;

    const issetToken = await tokenService.getTokenFromDB_ByUserId(userId);

    if (!issetToken) {
      throw ApiError.Unauthorized('Refresh token отсутствует в БД');
    }

    const user = await UserModel.findById(userId);

    const { accesToken, refreshToken } = tokenService.generateTokens({
      userId: user._id,
      username: user.username,
    });

    await tokenService.saveToken(user._id, refreshToken);

    return {
      accesToken,
      refreshToken,
    };
  }
}

export default new AuthService();
