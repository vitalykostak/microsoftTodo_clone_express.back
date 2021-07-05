import jwt from 'jsonwebtoken';

import TokenModel from '../models/Token.js';

import config from '../config.js';

class TokenService {
  generateTokens(payload) {
    const accesToken = jwt.sign({ ...payload }, config.JWT_ACCES_SECRET, {
      expiresIn: config.JWT_ACCES_TIME,
    });

    const refreshToken = jwt.sign({ ...payload }, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_TIME.str,
    });

    return { accesToken, refreshToken };
  }

  //save refreshToken
  async saveToken(userId, refreshToken) {
    const existingToken = await TokenModel.findOne({ user: userId });

    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      return await existingToken.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async deleteToken(userId) {
    const result = await TokenModel.deleteOne({ user: userId });

    return result;
  }

  verifyRefreshToken(refreshToken) {
    try {
      const result = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
      return result;
    } catch {
      return null;
    }
  }

  verifyAccesToken(accesToken) {
    try {
      const result = jwt.verify(accesToken, config.JWT_REFRESH_SECRET);
      return result;
    } catch {
      return null;
    }
  }

  async getTokenFromDB_ByUserId(userId) {
    const result = await TokenModel.findOne({ user: userId });
    return result ? result : null;
  }
}

export default new TokenService();
