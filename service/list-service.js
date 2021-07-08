import ListModel from '../models/List.js';

import ApiError from '../exceptions/api-exception.js';

class ListService {
  async getListsByUserId(id) {
    const lists = await ListModel.find({ listOwnerId: id });
    if (lists.length === 0) {
      throw ApiError.NotFound('Пользователь пока не создавал списки');
    }
    return lists;
  }
}

export default new ListService();
