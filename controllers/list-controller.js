import { validationResult } from 'express-validator';
import listService from '../service/list-service.js';

import ApiError from '../exceptions/api-exception.js';

class ListController {
  async getUserLists(req, res, next) {
    try {
      const { userId } = req.$requestor;
      const lists = await listService.getListsByUserId(userId);
      console.log(lists);
      res.json(lists);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
      }
      const { userId } = req.$requestor;
      const { label } = req.body;
      const newList = await listService.create(userId, label);
      console.log(newList);
      return res.status(201).json(newList);
    } catch (e) {
      next(e);
    }
  }
}

export default new ListController();
