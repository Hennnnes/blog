const fs = require('fs');
const rimraf = require('rimraf');

class File {

	static resetDist() {
		// delete html files from dist dir
		rimraf.sync(__dirname + '/../../dist/*.html');	
	}

	static async getFilesInFolder() {
		return new Promise( (resolve, reject) => {
			fs.readdir( __dirname + '/../content/', (err, files) => {
				if (err) {
					return reject();
				}

				return resolve(files);
			});
		});
	}

	static async getFileContent( filename ) {
		return new Promise( (resolve, reject) => {
			fs.readFile(`${ __dirname }/../content/${filename}`, (err, content) => {
				if (err) {
					return reject(err);
				}

				if (Buffer.isBuffer(content)) {
					content = content.toString('utf8');
				}

				return resolve(content);
			})
		})
	};
};

module.exports = File;