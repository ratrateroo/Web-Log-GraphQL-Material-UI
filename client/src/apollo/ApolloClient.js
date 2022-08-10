import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

import { getUserData } from "../services/UserData/index";

//=========================ERROR LINK===========================
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
//=========================ERROR LINK===========================
//=========================TIME START LINK===========================
const timeStartLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  return forward(operation);
});
//=========================TIME START LINK===========================

//=========================LOG TIME LINK===========================
const logTimeLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    // data from a previous link
    const time = new Date() - operation.getContext().start;
    console.log(
      `operation ${operation.operationName} took ${time} to complete`
    );
    return data;
  });
});

//=========================LOG TIME LINK===========================

//=========================AUTH LINK===========================
const authLink = setContext(async (_, { headers }) => {
  //const userData = localStorage.getItem('userdata');
  const userDataMemory = await getUserData();
  console.log("User data retrieved from memory.");
  const userDataLocalStorage = localStorage.getItem("userdata");
  console.log("User data retrieved from local storage.");

  // if (JSON.stringify(userDataMemory) === userDataLocalStorage) {
  // 	console.log('String Data Matched.');
  // }
  // const object1 = userDataMemory;
  // const object2 = JSON.parse(userDataLocalStorage);
  // if (Object.entries(object1).toString() === Object.entries(object2).toString()) {
  // 	console.log('Object Data Matched.');
  // }

  console.log("Client");
  console.log(`Bearer ${userDataMemory.token}`);
  const localStore = JSON.parse(userDataLocalStorage);
  if (!userDataMemory.token || !localStore.token) {
    console.log("No Token");
    return {
      headers: {
        ...headers,
      },
    };
  }
  console.log("Token Found");
  return {
    headers: {
      ...headers,
      authorization:
        userDataMemory || localStore
          ? `Bearer ${userDataMemory.token || localStore.token}`
          : "",
    },
  };
});
//=========================AUTH LINK===========================

// const authMiddleware = new ApolloLink((operation, forward) => {
// 	const userData = getUserData();
// 	// add the authorization to the headers
// 	operation.setContext(({ headers }) => ({
// 		headers: {
// 			...headers,
// 			authorization: userData ? `Bearer ${userData.token}` : '',
// 		},
// 	}));

// 	return forward(operation);
// });

//=========================UPLOAD LINK===========================
const uploadLink = createUploadLink({
  uri: `http://localhost:${process.env.SERVER_PORT}/graphql`,
  // fetchOptions: {
  //   mode: "no-cors",
  // },
  // credentials: 'include',
});
//=========================UPLOAD LINK===========================

export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    timeStartLink,
    logTimeLink,
    authLink,
    uploadLink,
  ]),
  //link: ApolloLink.from([authMiddleware, uploadLink]),
  //link: authLink.concat(uploadLink),
  //link: authMiddleware.concat(uploadLink),
  //link: from([errorLink, authLink, uploadLink]),
  cache: new InMemoryCache(),
});
