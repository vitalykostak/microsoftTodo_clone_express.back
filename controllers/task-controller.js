import ApiError from '../exceptions/api-exception.js';
import { validationResult } from 'express-validator';
import taskService from '../service/task-service.js';

class TaskController {
  async getUserTasks(req, res, next) {
    try {
      const { userId } = req.$requestor;

      const tasks = await taskService.getTasksByUserId(userId);
      res.json(tasks);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка валидации', [...validationErrors.array()])
        );
      }

      const { userId } = req.$requestor;
      const { task } = req.body;

      const result = await taskService.create(userId, task);
      return res.status(201).json(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка валидации', [...validationErrors.array()])
        );
      }

      const { updateData, taskId } = req.body;

      const result = await taskService.update({ taskId, updateData });
      return res.json(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new TaskController();
