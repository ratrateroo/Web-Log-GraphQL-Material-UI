const { gql } = require('apollo-server-express');

const typeDefs = gql`
	scalar Upload

	type Check {
		message: String!
	}

	type User {
		_id: ID!
		username: String!
		email: String!
		password: String
		firstname: String!
		middlename: String!
		lastname: String!
		createdBlogs: [Blog!]
		createAt: String!
		updateAt: String!
		profileimage: String!
	}

	type AuthData {
		userId: ID!
		token: String!
		tokenExpiration: Int!
	}

	type Blog {
		_id: ID!
		title: String!
		content: String!
		createdAt: String!
		updatedAt: String!

		author: User!
	}

	type Friend {
		_id: ID!
		friend: User!
		user: User!
		createdAt: String!
		updatedAt: String!
	}

	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}

	input UserInput {
		username: String!
		email: String!
		password: String
		firstname: String!
		middlename: String!
		lastname: String!
	}

	input BlogInput {
		title: String!
		content: String!
	}

	type Query {
		check: Check!
		profileImage(id: ID!): User!
		user(id: ID!): User!
		users: [User!]!
		blogs: [Blog!]!
		friends: [Friend!]!
		login(username: String!, password: String!): AuthData!
	}

	type Mutation {
		createUser(userInput: UserInput): AuthData!
		signUpUser(userInput: UserInput): AuthData!
		createBlog(blogInput: BlogInput): Blog
		addFriend(friendId: ID!): Friend!
		removeFriend(friendId: ID!): Friend!
		updateImage(userId: ID!, profileImage: String!): User
		uploadProfileImage(file: Upload!): File
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;

module.exports = typeDefs;
