require('dotenv').config();
const jwt = require('jsonwebtoken');

function getTokenPayload(token) {
	return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
}

function getUserId(req, authToken) {
	if (req) {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.replace('Bearer ', '');
			if (!token) {
				console.log('No token found');
				throw new Error('No token found');
			}
			const { userId } = getTokenPayload(token);
			console.log('Login Request.');
			console.log(userId);
			return userId;
		}
	} else if (authToken) {
		const { userId } = getTokenPayload(authToken);
		console.log('Authenticated Request.');
		return userId;
	}

	throw new Error('Not authenticated');
}

module.exports = {
	getUserId,
};
