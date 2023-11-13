import React from 'react';

export const RegularExpressions = () => (
	<>
		<hr />
		<h2>Regular Expressions</h2>
		<p>
			In short, a <em>regular expression</em> is a sequence of characters that specifies
			a match pattern in text. <em>Regexes</em> are found in many programming languages
			and text editors. <strong>Conlang Toolbox</strong> uses JavaScript-style regexes
			without the surrounding slash characters.
		</p><p>
			Fully explaining regular expressions is a topic that's too complicated for this
			app to cover, but they are very useful. Here are some resources where you can
			learn more about them:
		</p>
		<ul>
			<li><a href="https://en.wikipedia.org/wiki/Regular_expression"
			>Wikipedia: Regular Expression</a></li>
			<li><a href={
				"https://developer.mozilla.org/en-US/docs/Web/JavaScript/"
				+ "Guide/Regular_expressions#writing_a_regular_expression_pattern"}
			>MDN: Writing a regular expression</a></li>
			<li><a href="https://www.regular-expressions.info"
			>Regular-Expressions.info</a>, a tutorial site.</li>
			<li><a href="https://www.geeksforgeeks.org/write-regular-expressions/"
			>Geeks for Geeks: Write Reguar Expressions</a></li>
		</ul>
	</>
);
