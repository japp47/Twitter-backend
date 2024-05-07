import express from 'express';

import { createTweet, getTweet } from '../../controllers/tweet-controller.js'
import { toggleLike } from '../../controllers/like-controller.js'
import { createComment } from '../../controllers/comment-controller.js'
import { signUp, login } from '../../controllers/user-controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
const router = express.Router();

router.post('/tweets',createTweet);
router.get('/tweets/:id', getTweet)
router.post('/likes/toggle', toggleLike);
router.post('/comments',authenticate, createComment);
router.post('/signup', signUp); 
router.post('/login', login);


export default router;

//AKIAYS2NTD3V7XFQPYER
//62SSIsGFFVeYt5DjxW2C57P5IAch8vploKQx2Tej