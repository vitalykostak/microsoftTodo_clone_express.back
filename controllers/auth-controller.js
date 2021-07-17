import { validationResult } from 'express-validator';

import config from '../config.js';

import ApiError from '../exceptions/api-exception.js';

import authService from '../service/auth-service.js';

class AuthController {
  async registration(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка валидации', [...validationErrors.array()])
        );
      }

      const { firstName, surname, username, password } = req.body;

      const userData = await authService.registration(
        firstName,
        surname,
        username,
        password
      );

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: config.JWT_REFRESH_TIME.ms,
        httpOnly: true,
      });

      return res.status(201).json({
        userId: userData.userId,
        firstName: userData.firstName,
        surname: userData.surname,
        username: userData.username,
        accesToken: userData.accesToken,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка валидации', [...validationErrors.array()])
        );
      }
      const { username, password } = req.body;

      const userData = await authService.login(username, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: config.JWT_REFRESH_TIME.ms,
        httpOnly: true,
      });

      return res.json({
        userId: userData.userId,
        username: userData.username,
        accesToken: userData.accesToken,
      });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { userId } = req.$requestor;
      const result = await authService.logout(userId);

      res.clearCookie('refreshToken');

      return res.status(204).end();
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const tokens = await authService.refreshToken(refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: config.JWT_REFRESH_TIME.ms,
        httpOnly: true,
      });

      return res.json({
        accesToken: tokens.accesToken,
      });
    } catch (e) {
      res.clearCookie('refreshToken');
      next(e);
    }
  }
}

export default new AuthController();
