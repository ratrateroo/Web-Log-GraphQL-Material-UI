const { mkdirSync, existsSync, stat } = require('fs');
const path = require('path');

const createDirectory = (foldername) => {
	existsSync(path.join(__dirname, `../public/${foldername}`)) ||
		mkdirSync(path.join(__dirname, `../public/${foldername}`));

	// Getting information for a directory

	stat(path.join(__dirname, `../public/${foldername}`), (error, stats) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Stats object for: ${path.join(__dirname, `./public/${foldername}`)}`);
			//console.log(stats);
			// Using methods of the Stats object
			console.log('Path is file:', stats.isFile());
			console.log('Path is directory:', stats.isDirectory());
		}
	});
};
module.exports = createDirectory;
