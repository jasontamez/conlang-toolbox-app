import escapeRegexp from 'escape-string-regexp';
import {
	WGCharGroupObject,
	WECharGroupObject
} from './ReduxDucksTypes';

const calculateCharGroupReferenceRegex = (transform: string, charGroupMap: Map<string, WGCharGroupObject | WECharGroupObject>) => {
	// Check transforms for %CharGroup references
	// %% condenses to %, so split on those to begin with.
	const broken = transform.split("%%");
	// Create a variable to hold the pieces as they are handled
	const final = [];
	while(broken.length > 0) {
		// First, check for character group negation
		// Separate along !% instances
		let testing = broken.shift()!.split("!%");
		// Save first bit, before any !%
		let reformed = testing.shift();
		// Handle each instance
		while(testing.length > 0) {
			const bit = testing.shift();
			// What's the character group being negated?
			const charGroup = charGroupMap.get(bit!.charAt(0));
			// Does it exist?
			if(charGroup !== undefined) {
				// CharGroup found. Replace with [^a-z] construct, where a-z is the character group contents.
				reformed += "[^" + escapeRegexp(charGroup.run) + "]" + bit!.slice(1);
			} else {
				// If character group is not found, it gets ignored.
				reformed = "!%" + bit;				
			}
		}
		// Now check for character groups
		// Separate along % instances
		testing = reformed!.split("%");
		// Save the first bit, before any %
		reformed = testing.shift();
		// Handle each instance
		while(testing.length > 0) {
			const bit = testing.shift();
			// What's the character group?
			const charGroup = charGroupMap.get(bit!.charAt(0));
			// Does it exist?
			if(charGroup !== undefined) {
				// CharGroup found. Replace with [a-z] construct, where a-z is the character group contents.
				reformed += "[" + escapeRegexp(charGroup.run) + "]" + bit!.slice(1);
			} else {
				// If character group is not found, it gets ignored.
				reformed = "%" + bit;				
			}
		}
		// Save reformed for later!
		final.push(reformed);
	}
	// Reform info with %% reduced back to % and save as regexp
	return new RegExp(final.join("%"), "g");
};


export default calculateCharGroupReferenceRegex;
