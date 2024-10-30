import express from 'express';
import { fetchComments, createComment, login } from '../controllers/commentController';
import { Server as SocketIOServer } from 'socket.io';

declare global {
    namespace Express {
        interface Application {
            io?: SocketIOServer;
        }
    }
}

const router = express.Router();

router.post('/login', login);
router.get('/comments', fetchComments);
router.post('/comments', (req, res) => {
    const io = req.app.get('io');
    if (io) {
        createComment(req, res, io);
    } else {
        res.status(500).json({ message: 'Socket.IO server not initialized' });
    }
});

export default router;
