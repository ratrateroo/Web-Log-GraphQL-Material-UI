const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	//get the header
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		req.isAuth = false;
		return next();
	}

	//split the header and token
	const token = authHeader.split(' ')[1];

	//no token
	if (!token || token === '') {
		req.isAuth = false;
		return next();
	}

	console.log(token);

	//decode the token
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'secretkeyforhashing');
	} catch (err) {
		req.isAuth = false;
		return next();
	}

	if (!decodedToken) {
		req.isAuth = false;
		return next();
	}

	req.isAuth = true;
	req.userId = decodedToken.userId;
	console.log(req.userId);
	res.locals.userId = decodedToken.userId;
	next();
};
