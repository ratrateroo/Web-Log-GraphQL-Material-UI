const { ApolloServer } = require('apollo-server-express');

//import typeDefs
const typeDefs = require('../graphql/schema/typeDefs');
//import resolvers
const resolvers = require('../graphql/resolvers/resolvers');

console.log('Apollo Server Created.');

const apolloserver = new ApolloServer({
	typeDefs,
	resolvers,
});

module.exports = apolloserver;
