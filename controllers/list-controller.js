import listService from '../service/list-service.js';

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
}

export default new ListController();
