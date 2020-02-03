const MarkdownIt = require('markdown-it');
const fs = require('fs');
const File = require('./src/helpers/file');

const md = new MarkdownIt();
const Template = require('./src/config/html_template');
const IndexTemplate = require('./src/config/index_template');

class MarkdownInterpreter {
	constructor() {
		this.src = __dirname + '/src/content/';
		this.dist = __dirname + '/dist/';
		
		this.files = [];

		File.resetDist();
		this.init();
	}

	async init() {
		try {
			let sourceFiles = await File.getFilesInFolder();
			
			for (let i = 0; i < sourceFiles.length; i++) {
				const content = await File.getFileContent(sourceFiles[i]);
				const html = this.convertFileContentToHTML(content);
				const date = sourceFiles[i].split('_')[0];
				const name = sourceFiles[i].split('_')[1].split('.')[0];
				
				this.files.push({ 
					name: name,
					content: content,
					html: html,
					date: date 
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

	convertFileContentToHTML(content) {
		return md.render(content);
	}

	createArticleFile(file) {
		const content = Template
			.replace('<!-- title -->', file.name.replace('-', ' '))
			.replace('<!-- content -->', file.html);

		return this.saveHTMLFile(file.name, content);
	}

	saveHTMLFile(filename, content) {	
		fs.writeFileSync(`${this.dist}${filename}.html`, content, (err) => {
			if (err) {
				console.log(err)
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
			items.push(`<li class="toc-list__item">
				<a class="toc-list__link" href="${file.name}.html">${file.name.replace('_', ' ')}</a>
			</li>`)
		})

		const htmlString = `<ol class="toc-list">${ items.join('') }</ol>`

		content = content.replace('<!-- content -->', htmlString)
		
		this.saveHTMLFile('index', content);
	}
}

new MarkdownInterpreter();