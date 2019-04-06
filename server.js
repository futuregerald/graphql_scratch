const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// connecting to DB
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

// initializing app
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  creentials: true,
};
app.use(cors(corsOptions));

// set up jwt authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});
// create graphiql app
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// Connect schemas with graphql
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser,
    },
  }))
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on post: ${PORT}`);
});
