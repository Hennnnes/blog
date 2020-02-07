const Template = `<!DOCTYPE html>
<html lang="de">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="author" content="Hennes Römmer <hello@hennes.me>"> 
	<title><!-- title --></title>
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			border: 20px solid #9BD7FF;
			background-color: #00000C;
			color: #FEFFFF;
			font-family: serif;
			letter-spacing: .03rem;
			line-height: 1.4;
			margin: 0;
			min-height: 100vh;
			padding: 0
		}

		.header {
			background-color: #9BD7FF;
			color: #00000C;
			padding: 2rem 0;
		}

		.header__headline {
			color: currentColor;
			display: block;
			margin: 0 auto;
			max-width: 30rem;
			padding: 0 1rem;
		}

		.header__headline a {
			text-decoration: none;
		}

		a {
			color: currentColor;
		}

		main,
		footer {
			margin: 0 auto;
			max-width: 30rem;
			padding: 0 1rem;
		}

		main {	
			font-size: 1.2rem;
			margin: 3rem auto;
		}

		footer {
			border-top: 1px solid currentColor;
			font-size: .8rem;
		}

		h1,
		h2,
		h3 {
			color: #9BD7FF;
			font-family: sans-serif;
		}

		h1,
		h2 {
			margin: 0 0 1rem 0;
			display: block;
			font-size: 2.5rem;
		}

		.article-date {
			font-style: italic;
		}

		.toc-list {
			list-style: none;
			padding-left: 0
		}

		.toc-list__item:not(:last-child) {
			margin-bottom: 1.5rem;
		}

		.toc-list__link {
			color: #9BD7FF;
			display: block;
			font-family: sans-serif;
			font-size: 2.5rem;
			font-weight: bold;
			text-decoration: none;
		}
	</style>
</head>
<body>
	<header class="header">
		<h1 class="header__headline"><a href="/">Just another blog.</a></h1>
	</header>
	<main>
		<!-- content -->
		<!-- date -->
	</main>
	<footer>
		<p>Zu erreichen bin ich unter <a href="mailto:hello@hennes.me">hello@hennes.me</a>. Verantwortlich für die Inhalte dieser Seite bin ich selbst (Hennes Römmer, Gravensteiner Weg 6, 22049 Hamburg).</p>
		<p>Es werden keine Cookies und nichts von externen Diensten verwendet. Im Webserver anfallende Logs werden ohne IP-Adresse gespeichert.</p>
	</footer>
</body>
</html>
`;

module.exports = Template;