let userData = {
	token: null,
	userId: null,
	tokenExpiration: null,
};
export const setUserData = (s) => {
	console.log('User Data Set.');
	userData = s;
};

export const getUserData = () => {
	console.log('User Data Get.');
	return userData;
};
