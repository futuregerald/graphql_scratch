const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// connecting to DB
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

// initializing app
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    if (token !== 'null') {
      try {
        const currentUser = await jwt.verify(token, process.env.SECRET);
        return { currentUser, Recipe, User };
      } catch (error) {
        console.log(error);
      }
    }
    return { Recipe, User };
  },
});

const PORT = process.env.PORT || 4444;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
