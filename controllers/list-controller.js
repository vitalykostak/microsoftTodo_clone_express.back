import { validationResult } from 'express-validator';
import listService from '../service/list-service.js';
import taskService from '../service/task-service.js';

import ApiError from '../exceptions/api-exception.js';

class ListController {
  async getUserLists(req, res, next) {
    try {
      const { userId } = req.$requestor;
      const lists = await listService.getListsByUserId(userId);
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
      return res.status(201).json(newList);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
      }
      const { listId, updateData } = req.body;
      const result = await listService.update({ listId, updateData });
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
      }

      const { listId } = req.body;

      await taskService.deleteByListId(listId);

      await listService.delete(listId);

      res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
}

export default new ListController();
