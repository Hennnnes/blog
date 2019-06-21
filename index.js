const MarkdownIt = require('markdown-it');
const fs = require('fs');
const rimraf = require("rimraf");

const md = new MarkdownIt();
const Template = require('./src/config/html_template');
const IndexTemplate = require('./src/config/index_template');

class MarkdownInterpreter {
	constructor() {
		this.src = './src/content/';
		this.dist = './dist/';
		
		this.files = [];

		this.resetDist();
		this.init();
	}

	async init() {
		try {
			let sourceFiles = await this.getFilesInFolder();
			
			for (let i = 0; i < sourceFiles.length; i++) {
				const fileContent = await this.getFileContent(sourceFiles[i]);
				const html = this.convertFileContentToHTML(fileContent);
				const createdDate = this.getFileCreatedDate(sourceFiles[i]);
				
				this.files.push({
					name: sourceFiles[i].split('.')[0],
					content: fileContent,
					html: html,
					date: createdDate
				});
			}
			
			
			this.files.forEach( (file) => {
				this.createArticleFile( file );
			});
			
			this.createIndexFile();

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

	getFileCreatedDate(filename) {
		const { ctime } = fs.statSync(`${this.src}${filename}`);
		return ctime;
	}

	createArticleFile(file) {
		const content = Template
			.replace('<!-- title -->', file.name.replace('_', ' '))
			.replace('<!-- content -->', file.html);

		return this.saveHTMLFile(file.name, content);
	}

	saveHTMLFile(filename, content) {	
		fs.writeFileSync(`${this.dist}${filename}.html`, content, (err) => {
			if (err) {
				return err;
			}
			console.log(`created File: ${this.dist}${filename}.html`)
			return;
		})
	}

	createIndexFile() {
		let content = IndexTemplate;
		const sortedFiles = this.files.sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		})

		let items = [];

		sortedFiles.forEach( (file) => {
			let date = new Date(file.date)
			date = date.toISOString();
			date = date.slice(0,10)

			items.push(`<li>
				<a href="${file.name}.html">${file.name.replace('_', ' ')}</a>
				<p>Erstellt: ${date}</p>
			</li>`)
		})

		const htmlString = `<ul>${ items.join('') }</ul>`

		content = content.replace('<!-- content -->', htmlString)
		
		this.saveHTMLFile('index', content);
	}
}

new MarkdownInterpreter();