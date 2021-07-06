import { Router } from 'express';

import authorizationMiddleware from '../middlewares/authorization-middleware.js';
import userController from '../controllers/user-controller.js';

const router = Router();

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summarry: User was logged out
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Find userData
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: 60e41a51a1f8972c5c1b1c87
 *                firstName:
 *                  type: string
 *                  example: John
 *                surname:
 *                  type: string
 *                  example: Doe
 *                username:
 *                  type: string
 *                  example: nickname24
 *       400:
 *         description: userNotFound
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Пользователь не найден
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
router.get('/me', authorizationMiddleware, userController.getMe);

export default router;
