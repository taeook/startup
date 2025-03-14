const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const authCookieName = 'token';

let users = [];
let reviews = []; // Sample reviews data

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
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
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Invalid username or password. Please try again.' });
  }
});

// Logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Fetch profile data
apiRouter.get('/profile', verifyAuth, (req, res) => {
    const user = findUser('token', req.cookies[authCookieName]);
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
apiRouter.get('/user-reviews', verifyAuth, (req, res) => {
  // Example user-specific reviews
  const userReviews = [
    { id: 1, title: 'Great Product!', content: 'I really enjoyed using this product.' },
    { id: 2, title: 'Not bad', content: 'It was okay, could be better.' },
  ];
  res.send(userReviews);
});

// Fetch all reviews
apiRouter.get('/reviews', (req, res) => {
  res.send(reviews);
});

// Middleware to verify that the user is authorized
function verifyAuth(req, res, next) {
  const user = findUser('token', req.cookies[authCookieName]);
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
    joined: new Date().toLocaleString(), // Store the current date
  };
  users.push(user);
  return user;
}

function findUser(field, value) {
  return users.find((u) => u[field] === value);
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