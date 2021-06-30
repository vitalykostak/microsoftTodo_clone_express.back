import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import config from '../config.js';

import ApiError from '../exceptions/api-exception.js';

import authService from '../service/auth-service.js';

class AuthController {
  async registration(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        console.log(...validationErrors.array());
        return next(
          ApiError.BadRequest('Ошибка валидации', [...validationErrors.array()])
        );
      }

      const { username, password } = req.body;

      const userData = await authService.registration(username, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: config.JWT_REFRESH_TIME.ms,
        httpOnly: true,
      });

      return res.status(201).json({
        userId: userData.userId,
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
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка валидации', [...errors.array()])
        );
      }

      const { userId } = req.body;
      const result = await authService.logout(userId);

      res.clearCookie('refreshToken');

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const tokens = await authService.refreshToken(refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: config.JWT_REFRESH_TIME.ms,
        httpOnly: true,
      });

      res.json({
        accesToken: tokens.accesToken,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
