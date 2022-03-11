const { ApolloServer } = require('apollo-server-express');

//import resolvers
const resolvers = require('../graphql/resolvers/resolvers');
//import typeDefs
const typeDefs = require('../graphql/schema/typeDefs');

console.log('Apollo Server Created.');

const apolloserver = new ApolloServer({
	typeDefs,
	resolvers,
});

module.exports = apolloserver;
