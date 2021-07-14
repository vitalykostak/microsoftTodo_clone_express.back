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

  async create(userId, label) {
    const newList = new ListModel({ listOwnerId: userId, label });
    await newList.save();
    return newList;
  }
}

export default new ListService();
