require('dotenv').config();
const express = require('express');
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require('cors');
const mongoose = require('mongoose');

const apolloserver = require('./apollo/apolloserver');
const createDirectory = require('./util/createDirectory');
const fileNameReader = require('./util/readFileNames');

const url = `mongodb://127.0.0.1:27017/${process.env.MONGO_DB}`;

const startServer = async () => {
	try {
		console.log('This is the server.');

		await mongoose
			.connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('Connected 🚀 To MongoDB Successfully');
			});

		//Start Apollo Server
		await apolloserver.start();
		const app = express();
		app.use(cors());
		app.use((req, res, next) => {
			console.log('Request Received.');
			next();
		});
		app.use(graphqlUploadExpress());
		apolloserver.applyMiddleware({ app });
		//Create images folder
		createDirectory('images');
		//serve public folder for path starting with /freefiles
		app.use('/freefiles', express.static('public'));
		app.listen({ port: process.env.PORT }, () => {
			console.log(
				`🚀  Server ready at http://localhost:${process.env.PORT}${apolloserver.graphqlPath}`
			);
		});

		// storeFileSystem({
		// 	stream: 'stream',
		// 	filename: 'filename',
		// 	mimetype: 'mimetype',
		// });

		fileNameReader();
	} catch (error) {
		console.log(error);
	}
};
//Starting the Server
console.log('Server Starting...');
startServer();
