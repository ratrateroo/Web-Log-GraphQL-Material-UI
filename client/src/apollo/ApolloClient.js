import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import { getUserData } from '../services/UserData/index';

// const authLink = setContext((_, { headers }) => {
// 	//const userData = localStorage.getItem('userdata');
// 	const userData = getUserData();

// 	console.log(userData);

// 	console.log('Client');
// 	console.log(`Bearer ${userData.token}`);
// 	if (!userData.token) {
// 		console.log('No Token');
// 		return {
// 			headers: {
// 				...headers,
// 			},
// 		};
// 	}
// 	console.log('Token Found');
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: userData ? `Bearer ${userData.token}` : '',
// 		},
// 	};
// });

const authMiddleware = new ApolloLink((operation, forward) => {
	const userData = getUserData();
	// add the authorization to the headers
	operation.setContext(({ headers }) => ({
		headers: {
			...headers,
			authorization: userData ? `Bearer ${userData.token}` : '',
		},
	}));

	return forward(operation);
});

const uploadLink = createUploadLink({
	uri: `http://localhost:8000/graphql`,
	// credentials: 'include',
});

//const httpLink = new HttpLink({ uri: `http://localhost:8000/graphql` });

//new client
// export const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });

export const client = new ApolloClient({
	// link: ApolloLink.from([uploadLink, authLink]),
	//link: ApolloLink.from([authMiddleware, uploadLink]),
	//link: authLink.concat(uploadLink),
	link: authMiddleware.concat(uploadLink),
	cache: new InMemoryCache(),
});

// export const client = new ApolloClient({
// 	link: link,
// 	cache: new InMemoryCache(),
// });
