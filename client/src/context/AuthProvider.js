import React, { useState, useCallback } from 'react';

import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);
	const [tokenExpiration, setTokenExpiration] = useState(null);
	const [userId, setUserId] = useState(null);

	const login = useCallback((token, userId, tokenExpiration) => {
		setIsLoggedIn(true);
		setToken(token);
		setUserId(userId);
		setTokenExpiration(tokenExpiration);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setToken(null);
		setUserId(null);
		setTokenExpiration(null);
	}, []);

	let value = {
		isLoggedIn: isLoggedIn,
		token: token,
		tokenExpiration: tokenExpiration,
		userId: userId,
		login: login,
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
