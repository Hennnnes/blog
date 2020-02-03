let BasicTemplate = require('./html_template');
const TITLE = 'Hennes Blog';
const intro = 'Hallo.'

const Template = BasicTemplate
	.replace('<!-- title -->', TITLE);

module.exports = Template;