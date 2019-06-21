const MarkdownIt = require('markdown-it');
const fs = require('fs');
const rimraf = require("rimraf");

const md = new MarkdownIt();
const Template = require('./src/config/html_template');

class MarkdownInterpreter {
	constructor() {
		this.src = './src/content/';
		this.dist = './dist/';

		this.resetDist();
		this.init();
	}

	async init() {
		try {
			let sourceFiles = await this.getFilesInFolder();
			let files = []

			for (let i = 0; i < sourceFiles.length; i++) {
				const fileContent = await this.getFileContent(sourceFiles[i]);
				const html = this.convertFileContentToHTML(fileContent);
				const modifiedDate = this.getFileModifiedDate(sourceFiles[i]);
				
				files.push({
					name: sourceFiles[i].split('.')[0],
					content: fileContent,
					html: html,
					date: modifiedDate
				});
			}

			for (let i = 0; i < files.length; i++ ) {
				await this.createHTMLFile( files[i] );
			}
		} catch (err) {
			console.error(err);
		}
	}

	resetDist() {
		// delete dist dir
		rimraf.sync(this.dist);
		
		// and create it again
		fs.mkdirSync(this.dist);
	}

	async getFilesInFolder() {
		return new Promise( (resolve, reject) => {
			fs.readdir( this.src, (err, files) => {
				if (err) {
					return reject();
				}

				return resolve(files);
			});
		});
	}

	async getFileContent( filename ) {
		return new Promise( (resolve, reject) => {
			fs.readFile(`${this.src}${filename}`, (err, content) => {
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

	convertFileContentToHTML(content) {
		return md.render(content);
	}

	getFileModifiedDate(filename) {
		const { mtime } = fs.statSync(`${this.src}${filename}`);
		return mtime;
	}

	async createHTMLFile(file) {
		return new Promise( (resolve, reject) => {
			const content = Template
				.replace('<!-- title -->', file.name.replace('_', ' '))
				.replace('<!-- content -->', file.html);

			fs.writeFile(`${this.dist}${file.name}.html`, content, (err) => {
				if (err) {
					return reject(err);
				}
				return resolve();
			})

		})
	}
}

new MarkdownInterpreter();