import express from 'express';
import * as AuthController from '../Controllers/AuthRouter.js'; 
import {loginSchema, registerSchema} from '../Utils/schema.js';
import {validateBody} from '../Utils/validate.js';

const router = express.Router();

router.route('/register')
     .post(validateBody(registerSchema),AuthController.register)
     
router.route('/login')
     .post(validateBody(loginSchema),AuthController.login)

router.route('/checkAuth')
     .post(AuthController.checkAuth)

router.route('/checkFront')
     .post(AuthController.checkFront)

router.route('/logout')
     .get(AuthController.logout)
export default router;