"use client";

import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  List,
  ListItemText,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import {z, ZodError} from "zod"

interface Comment {
  id: number;
  username: string;
  comment: string;
  timestamp: string;
}

const socket: Socket = io("http://localhost:4000");

export default function HomePage() {
  const [username, setUsername] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  



  useEffect(() => {
    const handleNewComment = (newComment: Comment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    };
  
    socket.on("newComment", handleNewComment);
  
    return () => {
      socket.off("newComment", handleNewComment);
    };
  }, []);
  

  const handleLogin = async () => {
    try {
        const userSchema = z.object({
            username: z.string().min(3).max(30)
        })
        userSchema.parse({username});
        await axios.post("http://localhost:4000/api/login", { username });
        setLoggedIn(true);
        localStorage.setItem("username", username);
    } catch (error) {
        console.log(error);
        setUsernameError(true)
        if (error instanceof ZodError) {
            return {
              errors: error.errors.map((e) => {setErrorMessage(e.message)}),
            };
          }
    }
  };

  const handlePostComment = async () => {
    try {
        const commentSchema = z.object({
            comment: z.string().min(1).max(100)
        })
        commentSchema.parse({comment});
        await axios.post("http://localhost:4000/api/comments", {
          username,
          comment,
        });
        setComment("");
    } catch (error) {
        console.log(error);
        setUsernameError(true)
        if (error instanceof ZodError) {
            return {
              errors: error.errors.map((e) => {setErrorMessage(e.message)}),
            };
          }
    }
  };

  return (
    <Container maxWidth="sm">
      {!loggedIn ? (
        <div>
          <Typography variant="h4">Login</Typography>
          <TextField
            label="Username"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            required
            helperText={usernameError ? errorMessage : ""}
            error={usernameError}
          />
          <Button onClick={handleLogin} variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </div>
      ) : (
        <div>
          <Typography align="center" variant="h5">
            Welcome, {username}
          </Typography>

          <List sx={{ mt: 2 }}>
            {comments.map((c) => (
              <Card key={c.id} sx={{ maxWidth: 550, mt: 1, maxHeight: 80 }}>
                <CardContent>
                <ListItemText
                        primary={`${c.username}: ${c.comment}`}
                        secondary={c.timestamp}
                      />
                </CardContent>
              </Card>
            ))}
          </List>

          <TextField
            label="Comment"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
            required
            helperText={usernameError ? errorMessage : ""}
            error={usernameError}
          />
          <Box textAlign="center">
            <Button
              onClick={handlePostComment}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Post Comment
            </Button>
          </Box>
        </div>
      )}
    </Container>
  );
}
