// const User = require('../models/user');
const storeFileSystem = require('./storeFileSystem');
const storeUpload = async (file) => {
	console.log('Context User ID');

	const { createReadStream, filename, mimetype, encoding } = await file.file;
	console.log(createReadStream);
	console.log(filename);
	console.log(mimetype);
	console.log(encoding);
	//check for the correct mimetype
	if (mimetype !== 'image/jpeg' && mimetype !== 'image/png' && mimetype !== 'image/jpg') {
		throw new Error(`File type ${mimetype} is invalid. Try uploading .jpg, jpeg, or .png file.`);
	}
	const stream = createReadStream();
	//console.log(stream);
	return storeFileSystem({
		stream: stream,
		mimetype: mimetype,
		filename: filename,
		encoding: encoding,
	});
};

module.exports = storeUpload;
