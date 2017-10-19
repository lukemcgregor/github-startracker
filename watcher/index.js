const request = require('request-promise');
const mongo = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017/startracker';

async function checkRepos() {
  const db = await mongo.MongoClient.connect(mongoUrl);
  try {
    const results = await Promise.all((await db.collection('tracked-repos').find({}).toArray()).map(repo => request({
      url: `https://api.github.com/repos/${repo.username}/${repo.repo}`,
      headers: {
        'User-Agent': 'blog-demo'
      },
      json: true
    })));
    await Promise.all(results.map(async (r) => {
      const last = (await db.collection('repo-stars')
        .find({ repo: r.name, username: r.owner.login })
        .sort({ _id: -1 })
        .limit(1)
        .toArray())[0];
      if (!last || last.stargazers_count !== r.stargazers_count) {
        console.log(`Stars changed for ${r.owner.login}/${r.name} ${!last ? 0 : last.stargazers_count}->${r.stargazers_count}`);
        await db.collection('repo-stars').insertOne({
          repo: r.name,
          username: r.owner.login,
          stargazers_count: r.stargazers_count
        });
      } else {
        console.log(`No change in stars for ${r.owner.login}/${r.name}`);
      }
    }));
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
}
checkRepos();

setInterval(checkRepos, 15 * 1000);
