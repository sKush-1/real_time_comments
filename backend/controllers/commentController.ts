import { Request, Response } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { getComments,addComment } from '../models/commentModals'; 
import {z} from 'zod'

export const fetchComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const comments = await getComments();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
};

export const createComment = async (req: Request, res: Response, io: SocketIOServer): Promise<void> => {
   
    try {
        const { username, comment } = req.body;
        const userSchema = z.object({
            username: z.string().min(3).max(30),
            comment: z.string().min(1).max(100),
        })
    
        userSchema.parse({username,comment});
        const newComment = await addComment(username, comment);
        io.emit('newComment', newComment);
        res.status(201).json(newComment);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error adding comment' });
    }
};

export const login = (req: Request, res: Response): void => {
    const { username } = req.body;
    const sessionId = Date.now(); 
    res.send({ sessionId, username });
};
