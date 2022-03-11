const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const filesEE = new EventEmitter();
const myfiles = [];
const folderName = './public/images';

// this event will be called when all files have been added to myfiles
filesEE.on('files_ready', function () {
	console.dir(myfiles);
});

console.log('length to zero');
const readFileNames = () => {
	// read all files from current directory
	fs.readdir(folderName, function (err, files) {
		myfiles.length = 0;
		if (err) throw err;
		files.forEach(function (file) {
			myfiles.push(file);
		});
		filesEE.emit('files_ready'); // trigger files_ready event
	});
	console.log('returning files');
	return myfiles;
};
module.exports = readFileNames;
