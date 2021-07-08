import { Router } from 'express';
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

export default router;
