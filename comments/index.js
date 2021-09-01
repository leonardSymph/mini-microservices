const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const paramsId = req.params.id;
  res.send(commentsByPostId[paramsId] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  comments.push({
    id: commentId,
    content: content,
    status: 'pending',
  });

  commentsByPostId[postId] = comments;

  axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: postId,
      status: 'pending',
    },
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Events Received:', req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log('listening on 4001');
});
