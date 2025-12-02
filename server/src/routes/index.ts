

import {Router} from "express"
import AuthController from "../controllersss/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import ChatGroupController from "../controller/ChatGroupController.js";
import ChatGroupUserController from "../controllersss/ChatGroupUserController.js";
import ChatsController from "../controllersss/ChatsController.js";
const router = Router();
//Auth Routes
router.post('/auth/login',AuthController.login)


//Chat Group Routes
router.post('/chat-group',authMiddleware,ChatGroupController.store);
router.get('/chat-group',authMiddleware,ChatGroupController.index);
router.get('/chat-group/:id',ChatGroupController.show);
router.put('/chat-group/:id',authMiddleware,ChatGroupController.update);
router.delete('/chat-group/:id',authMiddleware,ChatGroupController.destroy);

// Chat group users
router.get('/chat-group-users',ChatGroupUserController.index);
router.post('/chat-group-users',ChatGroupUserController.store);

// Chat Messages
router.get("/chats/:groupId",ChatsController.index)

export default router;