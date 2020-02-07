let BasicTemplate = require('./html_template');
const TITLE = 'Just another blog.';
const intro = 'Hallo.'

const Template = BasicTemplate
	.replace('<!-- title -->', TITLE)
	.replace('<!-- date -->', '');

module.exports = Template;