// Pull in required dependencies
let path = require('path');

// Import the list of friends
let friends = require('../data/friend.js');

// Export API routes
module.exports = function(app) {
	// console.log('___ENTER apiRoute.js___');

	// list of friends
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		let userInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		let userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		let matchName = '';
		let matchImage = '';
		let totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (let i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			let diff = 0;
			for (let j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};