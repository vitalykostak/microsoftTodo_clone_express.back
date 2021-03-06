import { Router } from 'express';
import { body } from 'express-validator';
import authorizationMiddleware from '../middlewares/authorization-middleware.js';
import taskController from '../controllers/task-controller.js';

const router = Router();

// api/task

/**
 * @swagger
 * /api/task:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summarry: Get all user's taks
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: All user's tasks is found and returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                    taskOwnerId :
 *                      type: string
 *                      example: 60e41a51a1f8972c5c1b1c87
 *                    text :
 *                      type: string
 *                      example: Todo anything
 *                    note :
 *                      type: string
 *                      example: Don't forget something
 *                    isImportant :
 *                      type: boolean
 *                      example: true
 *                    isDone :
 *                      type: boolean
 *                      example: false
 *                    creationDate :
 *                      type: string
 *                      example: 2021-07-06T08:37:42.597+00:00
 *                    completionDate :
 *                      type: string
 *                      example: 2021-07-06T08:37:42.597+00:00
 *       404:
 *         description: Tasks is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Пользователь пока не создавал задачи
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
router.get('', authorizationMiddleware, taskController.getUserTasks);

/**
 * @swagger
 * /api/task:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     summarry: Get all user's taks
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: object
 *     responses:
 *       201:
 *         description: Task was created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                    taskOwnerId :
 *                      type: string
 *                      example: 60e41a51a1f8972c5c1b1c87
 *                    text :
 *                      type: string
 *                      example: Todo anything
 *                    note :
 *                      type: string
 *                      example: Don't forget something
 *                    isImportant :
 *                      type: boolean
 *                      example: true
 *                    isDone :
 *                      type: boolean
 *                      example: false
 *                    creationDate :
 *                      type: string
 *                      example: 2021-07-06T08:37:42.597+00:00
 *                    completionDate :
 *                      type: string
 *                      example: 2021-07-06T08:37:42.597+00:00
 *       400:
 *         description: Tasks is not exists or not an object
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
router.post(
  '',
  authorizationMiddleware,
  body('task').exists().isObject().withMessage('Task should be an object'),
  taskController.create
);

/**
 * @swagger
 * /api/task:
 *   patch:
 *     security:
 *     - bearerAuth: []
 *     summarry: Update task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               updateData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Task was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                    taskOwnerId :
 *                      type: string
 *                      example: 60e41a51a1f8972c5c1b1c87
 *                    text :
 *                      type: string
 *                      example: Todo anything
 *                    note :
 *                      type: string
 *                      example: Don't forget something
 *                    isImportant :
 *                      type: boolean
 *                      example: true
 *                    isDone :
 *                      type: boolean
 *                      example: false
 *                    creationDate :
 *                      type: string
 *                      example: 2021-07-06T08:37:42.597+00:00
 *                    completionDate :
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

  body('taskId')
    .exists()
    .isMongoId()
    .withMessage('updateData should be an object'),
  taskController.update
);

/**
 * @swagger
 * /api/task:
 *   delete:
 *     security:
 *     - bearerAuth: []
 *     summarry: Delete task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: 60ec2a091a29df35e4da6a20
 *     responses:
 *       204:
 *         description: Task was deleted
 *       400:
 *         description: TaskId is not exists or not a mongoId
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
 *       404:
 *         description: Task is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Задача с таким Id не найдена
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
router.delete(
  '',
  authorizationMiddleware,
  body('taskId').exists().isMongoId().withMessage('TaskId should be a mongoId'),
  taskController.delete
);

export default router;
