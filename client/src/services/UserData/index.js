let userData = {
	token: null,
	userId: null,
	tokenExpiration: null,
};
export const setUserData = (s) => {
	console.log('User Data Set.');
	userData = s;
	console.log(s.token);
	localStorage.setItem('Token', JSON.stringify(s.token));
};

export const getUserData = () => {
	console.log('User Data Get.');
	return userData;
};
