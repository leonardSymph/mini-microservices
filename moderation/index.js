const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    console.log(data);
  }
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
