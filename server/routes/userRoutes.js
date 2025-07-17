import express from 'express';
import { userSignup, userLogin } from '../controllers/userControllers.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userSignup);


router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], userLogin);


// Auth check
import verifyToken from '../middlewares/userMiddleware.js';
import User from '../models/userModel.js';
router.get('/me', verifyToken, async (req, res) => {
  // userMiddleware will set req.userId
  const user = await User.findById(req.userId);
  res.json(user);
});


export default router;