import escapeRegexp from 'escape-string-regexp';
import {
	WGCategoryObject,
	WECategoryObject
} from './ReduxDucksTypes';

const calculateCategoryReferenceRegex = (rule: string, catMap: Map<string, WGCategoryObject | WECategoryObject>) => {
	// Check rewrite rules for %Category references
	// %% condenses to %, so split on those to begin with.
	let broken = rule.split("%%");
	// Create a variable to hold the pieces as they are handled
	let final = [];
	while(broken.length > 0) {
		// First, check for category negation
		// Separate along !% instances
		let testing = broken.shift()!.split("!%");
		// Save first bit, before any !%
		let reformed = testing.shift();
		// Handle each instance
		while(testing.length > 0) {
			let bit = testing.shift();
			// What's the category being negated?
			let category = catMap.get(bit!.charAt(0));
			// Does it exist?
			if(category !== undefined) {
				// Category found. Replace with [^a-z] construct, where a-z is the category contents.
				reformed += "[^" + escapeRegexp(category.run) + "]";
				// If category is not found, it gets ignored.
			}
			// Remove category identifier, save to reformed
			reformed += bit!.slice(1);
		}
		// Now check for categories
		// Separate along % instances
		testing = reformed!.split("%");
		// Save the first bit, before any %
		reformed = testing.shift();
		// Handle each instance
		while(testing.length > 0) {
			let bit = testing.shift();
			// What's the category?
			let category = catMap.get(bit!.charAt(0));
			// Does it exist?
			if(category !== undefined) {
				// Category found. Replace with [a-z] construct, where a-z is the category contents.
				reformed += "[" + escapeRegexp(category.run) + "]";
				// If category is not found, it gets ignored.
			}
			// Remove category identifier, save to reformed
			reformed += bit!.slice(1);
		}
		// Save reformed for later!
		final.push(reformed);
	}
	// Reform info with %% reduced back to % and save as regexp
	return new RegExp(final.join("%"), "g");
};


export default calculateCategoryReferenceRegex;
