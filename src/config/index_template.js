let BasicTemplate = require('./html_template');
const TITLE = 'Blog';
const intro = 'Hallo.'

const Template = BasicTemplate
	.replace('<!-- title -->', TITLE)
	.replace('<!-- content -->', `<h1>${intro}</h1>
		<!-- content -->`)
	;

module.exports = Template;