const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const app = express();
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
let usersCollection;
let postsCollection;

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    const db = client.db('startup');
    usersCollection = db.collection('users');
    postsCollection = db.collection('posts'); // New collection for posts
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

connectToDB();

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } 
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing email' });
  }
  else {
    const user = await createUser(req.body.username, req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    await usersCollection.updateOne({ username: user.username }, { $set: { token: user.token } });
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Invalid username or password. Please try again.' });
  }
});

// Logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await usersCollection.updateOne({ token: user.token }, { $unset: { token: "" } });
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Fetch profile data
apiRouter.get('/profile', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    res.send({
      name: user.username,
      email: user.email,
      joined: user.joined,
    });
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// Fetch user reviews
apiRouter.get('/user-reviews', verifyAuth, async (req, res) => {
  try {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      const userReviews = await postsCollection.find({ author: user.username }).toArray();
      res.send(userReviews);
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).send({ msg: 'Error fetching user reviews' });
  }
});

apiRouter.post('/posts/create', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    const post = {
      title: req.body.title,
      content: req.body.content,
      author: user.username,
      created: new Date().toLocaleString(),
      category: req.body.category, // Add categories
    };
    await postsCollection.insertOne(post);
    res.status(201).send({ msg: 'Post created successfully' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.get('/posts/category/:category', async (req, res) => {
  const category = req.params.category;
  const posts = await postsCollection.find({ category: category }).toArray();
  res.send(posts);
});

// Fetch all reviews
apiRouter.get('/reviews', async (req, res) => {
  try {
    const allReviews = await postsCollection.find({}).toArray();
    res.send(allReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send({ msg: 'Error fetching reviews' });
  }
});

// Middleware to verify that the user is authorized
async function verifyAuth(req, res, next) {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
}

async function createUser(username, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    joined: new Date().toLocaleString(),
  };
  await usersCollection.insertOne(user);
  return user;
}

async function findUser(field, value) {
  return await usersCollection.findOne({ [field]: value });
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});