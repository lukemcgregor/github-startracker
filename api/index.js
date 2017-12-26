const express = require('express');
// const request = require('request');
const {Pool, Client} = require('pg');
const pgtools = require('pgtools');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const connectionString = 'postgresql://postgres:postgres@localhost:5432';
const sql = fs.readFileSync(path.join(__dirname,'./sql/create-db.sql')).toString();

// This can also be a connection string
// (in which case the database part is ignored and replaced with postgres)

const pool = new Pool({
  connectionString: `${connectionString}/startracker`
});

pgtools.createdb({
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    host: 'localhost'
  }, 
  'startracker', 
  (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
});

// (async () =>{
//   try{
//     const conn = await pool.connect();
//     conn.release();
//   }
//   catch (err) {
//     const client = new Client({
//       user: 'postgres',
//       password: 'postgres',
//       database: 'postgres'
//     })
    
//     await client.connect()
    
//     try{
//       await client.query(sql)
//     }
//     catch(err){
//       console.error(err);
//       process.exit(-1);
//     }
//     finally{
//       client.done();
//     }
//   }
// })().catch(e=> 
//   console.error(e.message,e.stack)
// );

  const app = express();
  
  // app.post('/repos/:username/:repository', (req, res) => {
  //   request({
  //     url: `https://api.github.com/repos/${req.params.username}/${req.params.repository}`,
  //     headers: {
  //       'User-Agent': 'node'
  //     }
  //   }, (error, response, body) => {
  //     if (!error && response.statusCode === 200) {
  //       mongo.MongoClient.connect(mongoUrl, (err, db) => {
  //         db.collection('tracked-repos').insertOne({
  //           username: req.params.username,
  //           repo: req.params.repository
  //         }, () => {
  //           db.close();
  //         });
  //       });
  //       res.send(`${JSON.parse(body).stargazers_count}`);
  //     } else {
  //       res.send(`${error || response.statusCode}`);
  //     }
  //   });
  // });
  
  // app.get('/repos/:username/:repository/star-history', (req, res) => {
  //   mongo.MongoClient.connect(mongoUrl, (err, db) => {
  //     db.collection('repo-stars')
  //       .find({
  //         username: req.params.username,
  //         repo: req.params.repository
  //       })
  //       .sort({ _id: 1 })
  //       .toArray((err, history) => {
  //         if (history) {
  //           res.send(history.map(h => ({
  //             timestamp: mongo.ObjectId(h._id).getTimestamp(),
  //             stargazersCount: h.stargazers_count
  //           })));
  //         } else {
  //           res.status(404).send('Not found');
  //         }
  //         db.close();
  //       });
  //   });
  // });
  
  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);