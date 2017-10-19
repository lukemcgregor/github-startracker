const express = require('express');
const request = require('request');
const mongo = require('mongodb');

const PORT = process.env.PORT || 80;
const HOST = '0.0.0.0';
const mongoUrl = 'mongodb://localhost:27017/startracker';


mongo.MongoClient.connect(mongoUrl, (err, db) => {
  db.collection('tracked-repos').createIndex({ username: 1, repo: 1 }, { unique: true }, () => {
    db.close();
  });
});

const app = express();

app.post('/repos/:username/:repository', (req, res) => {
  request({
    url: `https://api.github.com/repos/${req.params.username}/${req.params.repository}`,
    headers: {
      'User-Agent': 'node'
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      mongo.MongoClient.connect(mongoUrl, (err, db) => {
        db.collection('tracked-repos').insertOne({
          username: req.params.username,
          repo: req.params.repository
        }, () => {
          db.close();
        });
      });
      res.send(`${JSON.parse(body).stargazers_count}`);
    } else {
      res.send(`${error || response.statusCode}`);
    }
  });
});

app.get('/repos/:username/:repository/star-history', (req, res) => {
  mongo.MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('repo-stars')
      .find({
        username: req.params.username,
        repo: req.params.repository
      })
      .sort({ _id: 1 })
      .toArray((err, history) => {
        if (history) {
          res.send(history.map(h => ({
            timestamp: mongo.ObjectId(h._id).getTimestamp(),
            stargazersCount: h.stargazers_count
          })));
        } else {
          res.status(404).send('Not found');
        }
        db.close();
      });
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
