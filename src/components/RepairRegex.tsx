const repairRegexErrors = (s: string) => {
	var backslash = false,
		curly = false,
		square = false,
		output: string[] = [];
	s.split("").forEach(function(q) {
		// If we previously had a backslash, add it to this element.
		if (backslash) {
			backslash = false;
			output.push("\\" + q);
		// If we discover a backslash, set up for the next loop.
		} else if (q === "\\") {
			backslash = true;
			return;
		// If we previously had a square brace, keep looking for its matching end.
		} else if (square) {
			if (q === "]") {
				// Found it.
				square = false;
			}
			output.push(q);
		// If we discover a square brace, pause lookups until we find its end.
		} else if (q === "[") {
			square = true;
			output.push(q);
		// If we previously had a curly brace, keep looking for its matching end.
		} else if (curly) {
			if (q === "}") {
				// Found it.
				curly = false;
			}
			output.push(q);
		// If we discover a curly brace, pause lookups until we find its end.
		} else if (q === "{") {
			curly = true;
			output.push(q);
		// If a boundary (#) is encountered, replace with the word-boundary regex.
		} else if(q === "#") {
			output.push("\\b");
		// Otherwise, treat as plain text (and possibly regex).
		} else {
			output.push(q);
		}
	});
	// Check for and insert missing end braces.
	if (square) {
		output.push("]");
	}
	if (curly) {
		output.push("}");
	}
	if(output.length > 0) {
		if(!square && !curly) {
			// Test for word-boundary at end.
			let end = output.pop()!;
			output.push((end === "\\b") ? "$" : end);
		}
		// Test for word-boundary at start.
		if(output[0] === "\\b") {
			output[0] = "^";
		}
	}
	return output.join("");
}

export default repairRegexErrors;
