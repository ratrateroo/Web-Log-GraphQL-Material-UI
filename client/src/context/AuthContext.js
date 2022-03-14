import { createContext } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	token: null,
	tokenExpiration: null,
	login: () => {},
	logout: () => {},
});
export default AuthContext;
