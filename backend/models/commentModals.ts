import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import conn from "../config/db.config";

export interface Comment {
    id: number;
    username: string;
    comment: string;
    timestamp: Date;
}

export const getComments = async (): Promise<[RowDataPacket]| null> => {
    const [rows] = await conn.promise().query<[RowDataPacket]>('SELECT * FROM comments');
    return rows;
};

export const addComment = async (username: string, comment: string): Promise<Comment| null>  => {
    const [result] = await conn.promise().query<ResultSetHeader>(
        'INSERT INTO comments (username, comment) VALUES (?, ?)',
        [username, comment]
    );

    if (result && result.insertId) {
        return { id: result.insertId, username, comment, timestamp: new Date() };
    }
    
    return null;
};
