const { ApolloServer } = require("apollo-server-express");

//import resolvers
const resolvers = require("../graphql/resolvers/resolvers");
//import typeDefs
const typeDefs = require("../graphql/schema/typeDefs");

const { getUserId } = require("../util/getUserId");

console.log("Apollo Server Created.");

const apolloserver = new ApolloServer({
  cors: {
    origin: ["http://localhost:3000"],
  },
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log("checking headers");
    if (req && req.headers.authorization) {
      console.log(req.headers.authorization);
    }
    return {
      ...req,

      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

module.exports = apolloserver;
