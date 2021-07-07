import TaskModel from '../models/Task.js';

import ApiError from '../exceptions/api-exception.js';

class TaskService {
  async getTasksByUserId(id) {
    const tasks = await TaskModel.find({ taskOwnerId: id });
    if (tasks.length === 0) {
      throw ApiError.NotFound('Пользователь пока не создавал задачи');
    }
    return tasks;
  }
}

export default new TaskService();
