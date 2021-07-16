import { Router } from 'express';
import { body } from 'express-validator';
import authorizationMiddleware from '../middlewares/authorization-middleware.js';
import listController from '../controllers/list-controller.js';

const router = Router();

// api/task

/**
 * @swagger
 * /api/list:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summarry: Get all user's taks
 *     tags: [List]
 *     responses:
 *       200:
 *         description: All user's lists is found and returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                    listOwnerId :
 *                      type: string
 *                      example: 60e41a51a1f8972c5c1b1c87
 *                    name :
 *                      type: string
 *                      example: Shopping list
 *
 *                    creationDate :
 *                      type: string
 *                      example: 2021-07-06T08:37:42.597+00:00
 *       404:
 *         description: List is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Пользователь пока не создавал списки
 *                 errors:
 *                  type: array
 *                  items:
 *                    type: object
 *       5xx:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Непредвиденная ошибка
 *
 */
router.get('', authorizationMiddleware, listController.getUserLists);

/**
 * @swagger
 * /api/list:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     summarry: Get all user's taks
 *     tags: [List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 example: Список без названия
 *     responses:
 *       201:
 *         description: List was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   listOwnerId :
 *                     type: string
 *                     example: 60e41a51a1f8972c5c1b1c87
 *                   name :
 *                     type: string
 *                     example: Shopping list
 *
 *                   creationDate :
 *                     type: string
 *                     example: 2021-07-06T08:37:42.597+00:00
 *       400:
 *         description: List name not in request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Название списка не передано в запросе
 *                 errors:
 *                  type: array
 *                  items:
 *                    type: object
 *       5xx:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Непредвиденная ошибка
 *
 */
router.post(
  '',
  authorizationMiddleware,
  body('label')
    .exists()
    .withMessage('Имя списка не передано в запросе')
    .isLength({ min: 1, max: 25 })
    .withMessage('Некорректная длина названия: 1-25 симв.'),
  listController.create
);

/**
 * @swagger
 * /api/list:
 *   patch:
 *     security:
 *     - bearerAuth: []
 *     summarry: Update list
 *     tags: [List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listId:
 *                 type: string
 *               updateData:
 *                 type: object
 *     responses:
 *       200:
 *         description: List was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                    listOwnerId :
 *                      type: string
 *                      example: 60e41a51a1f8972c5c1b1c87
 *                    label :
 *                      type: string
 *                      example: New list
 *                    creationDate :
 *                      type: string
 *                      example: 2021-07-06T08:37:42.597+00:00
 *       400:
 *         description: UpdateData is not exists or not an object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Ошибка валидации
 *                 errors:
 *                  type: array
 *                  items:
 *                    type: object
 *       5xx:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Непредвиденная ошибка
 *
 */
router.patch(
  '',
  authorizationMiddleware,
  body('updateData')
    .exists()
    .isObject()
    .withMessage('updateData should be an object'),
  body('listId')
    .exists()
    .withMessage('Не передан идентификатор списка')
    .isMongoId()
    .withMessage('Идентификатор списка не валиден'),
  listController.update
);
export default router;
