import taskService from '../service/task-service.js';

class TaskController {
  async getUserTasks(req, res, next) {
    try {
      const { userId } = req.$requestor;

      const tasks = await taskService.getTasksByUserId(userId);
      console.log(tasks);
      res.json(tasks);
    } catch (e) {
      next(e);
    }
  }
}

export default new TaskController();
