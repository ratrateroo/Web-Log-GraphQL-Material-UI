import {
	ApolloClient,
	InMemoryCache,
	ApolloLink,
	HttpLink,
} from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

import { getUserData } from '../util/userData';

const authLink = setContext((_, { headers }) => {
	//const userData = localStorage.getItem(LOGGED_IN_USER);
	const userData = getUserData();
	console.log('Client');
	console.log(`Bearer ${userData.token}`);
	if (!userData.token) {
		return {
			headers: {
				...headers,
			},
		};
	}
	return {
		headers: {
			...headers,
			authorization: userData ? `Bearer ${userData.token}` : '',
		},
	};
});

const uploadLink = createUploadLink({
	uri: `http://localhost:8000/graphql`,
	// credentials: 'include',
});

const httpLink = new HttpLink({ uri: `http://localhost:8000/graphql` });

//new client
// export const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });

export const client = new ApolloClient({
	link: ApolloLink.from([authLink, uploadLink, httpLink]),
	cache: new InMemoryCache(),
});

// export const client = new ApolloClient({
// 	link: link,
// 	cache: new InMemoryCache(),
// });
