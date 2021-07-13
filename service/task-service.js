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

  async create(userId, task) {
    task.taskOwnerId = userId;
    const newTask = new TaskModel(task);
    await newTask.save();
    return newTask;
  }

  async update({ taskId, updateData }) {
    updateData = this.normaliseUpdateData(updateData);
    const updateResult = await TaskModel.findOneAndUpdate(
      { _id: taskId },
      updateData,
      { new: true }
    );
    return updateResult;
  }

  async delete(taskId) {
    const result = await TaskModel.findByIdAndDelete(taskId);
    if (!result) {
      throw ApiError.NotFound('Задача с таким Id не найдена');
    }
    console.log(result);
  }

  normaliseUpdateData(updateData) {
    for (let key in updateData) {
      switch (key) {
        case 'isDone': {
          updateData[key]
            ? (updateData.completionDate = Date.now())
            : (updateData.completionDate = null);
          break;
        }
      }
    }
    return updateData;
  }
}

export default new TaskService();
