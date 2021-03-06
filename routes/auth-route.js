import express from 'express';
import { body } from 'express-validator';

import authController from '../controllers/auth-controller.js';
import authorizationMiddleware from '../middlewares/authorization-middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/auth/registration:
 *   post:
 *     summarry: Registration a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *               username:
 *                 type: string
 *                 example: Nickname_24
 *               password:
 *                type: string
 *                example: pass123456
 *     responses:
 *       201:
 *         description: The user was created. Returns object with user's data and set refreshToken to cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId :
 *                  type: string
 *                  example: 60d5d9b9dfbd1d4fa09f3302
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 surname:
 *                   type: string
 *                   example: Doe
 *                 username:
 *                   type: string
 *                   example: Nickname_24
 *                 accesToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGQ1ZDliOWRmYmQxZDRmYTA5ZjMzMDIiLCJ1c2VybmFtZSI6IlZpdGFseSIsImlhdCI6MTYyNDYyNzY0MSwiZXhwIjoxNjI3MjE5NjQxfQ.2onAyH_lGtpLcyPMDDzV9_eCjNQJn0MOEnP0LBMgydk
 *       401:
 *         description: Unathorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: Unathorized
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
 *                  example: ???????????????????????????? ????????????
 *
 */
router.post(
  '/registration',
  body('firstName')
    .exists()
    .isLength({ min: 2, max: 15 })
    .withMessage('?????? - 2-15 ????????????????'),
  body('surname')
    .exists()
    .isLength({ min: 2, max: 15 })
    .withMessage('?????????????? - 2-15 ????????????????'),
  body('username')
    .exists()
    .isLength({ min: 4, max: 15 })
    .withMessage('?????? ???????????????????????? - 4-15 ????????????????'),
  body('password')
    .exists()
    .isLength({ min: 6, max: 15 })
    .withMessage('???????????? - 6-15 ????????????????'),
  authController.registration
);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summarry: User authorization
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Nickname_24
 *               password:
 *                type: string
 *                example: pass123456
 *     responses:
 *       200:
 *         description: User was logged in. Returns object with user's data and set refreshToken to cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId :
 *                  type: string
 *                  example: 60d5d9b9dfbd1d4fa09f3302
 *                 username:
 *                   type: string
 *                   example: Nickname_24
 *                 accesToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGQ1ZDliOWRmYmQxZDRmYTA5ZjMzMDIiLCJ1c2VybmFtZSI6IlZpdGFseSIsImlhdCI6MTYyNDYyNzY0MSwiZXhwIjoxNjI3MjE5NjQxfQ.2onAyH_lGtpLcyPMDDzV9_eCjNQJn0MOEnP0LBMgydk
 *       400:
 *         description: Validation error or username is already taken or invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: ???????????? ??????????????????
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
 *                  example: ???????????????????????????? ????????????
 *
 */
router.post(
  '/login',
  body('username')
    .exists()
    .isLength({ min: 4, max: 15 })
    .withMessage('?????? ???????????????????????? - 4-15 ????????????????'),
  body('password')
    .exists()
    .isLength({ min: 6, max: 15 })
    .withMessage('???????????? - 6-15 ????????????????'),
  authController.login
);
/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     security:
 *     - bearerAuth: []
 *     summarry: User was logged out
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: The user was logged out. RefreshToken was unset from cookie
 *       400:
 *         description: Validation error - received data is not a mongoId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  example: ???? ???????????????????? ID ????????????????????????
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
 *                  example: ???????????????????????????? ????????????
 *
 */

router.delete('/logout', authorizationMiddleware, authController.logout);

/**
 * @swagger
 * /api/auth/refresh:
 *   get:
 *     summarry: Set new refreshToken
 *     tags: [Auth]
 *
 *     responses:
 *       200:
 *         description: RefreshToken in cookie was updated. Return object with accesToken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accesToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGQ1ZDliOWRmYmQxZDRmYTA5ZjMzMDIiLCJ1c2VybmFtZSI6IlZpdGFseSIsImlhdCI6MTYyNDYyNzY0MSwiZXhwIjoxNjI3MjE5NjQxfQ.2onAyH_lGtpLcyPMDDzV9_eCjNQJn0MOEnP0LBMgydk
 *       401:
 *         description: Unathorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message :
 *                  type: string
 *                  enum: [Refresh token ????????????????????, Refresh token ???? ???????????? ??????????????????????, Refresh token ?????????????????????? ?? ????]
 *                  example: Refresh token ???? ???????????? ??????????????????????
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
 *                  example: ???????????????????????????? ????????????
 *
 */

router.get('/refresh', authController.refreshToken);

export default router;
